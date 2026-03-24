const User = require("../models/usersModel");

const PATCHABLE_FIELDS = [
  "first_name",
  "last_name",
  "currency",
  "timezone",
  "monthly_income",
  "tax",
  "phone_number",
];
const MAX_PROFILE_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

exports.getCurrentUserService = async (userId) => {
  const user = await User.findById(userId).select(
    "+profile_image +profile_image_mime_type +profile_image_size",
  );
  if (!user) throw new Error("User does not exist!");

  const userObject = user.toObject();
  userObject.profile_image = userObject.profile_image
    ? userObject.profile_image.toString("base64")
    : null;

  return userObject;
};

exports.updateCurrentUserService = async (userId, payload) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User does not exist!");

  const payloadKeys = Object.keys(payload);
  if (!payloadKeys.length) throw new Error("No fields provided for update");

  const invalidFields = payloadKeys.filter(
    (field) => !PATCHABLE_FIELDS.includes(field),
  );
  if (invalidFields.length) {
    throw new Error(`Unsupported field(s): ${invalidFields.join(", ")}`);
  }

  payloadKeys.forEach((field) => {
    user[field] = payload[field];
  });

  await user.save();
  return user;
};

exports.uploadProfileImageService = async (
  userId,
  imageBuffer,
  mimeType = "application/octet-stream",
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User does not exist!");

  if (!Buffer.isBuffer(imageBuffer) || !imageBuffer.length) {
    throw new Error("Profile image binary payload is required");
  }

  if (imageBuffer.length > MAX_PROFILE_IMAGE_SIZE_BYTES) {
    const error = new Error("Profile image size exceeds 2MB limit");
    error.statusCode = 413;
    throw error;
  }

  user.profile_image = imageBuffer;
  user.profile_image_mime_type = mimeType;
  user.profile_image_size = imageBuffer.length;

  await user.save();

  return {
    profile_image_size: user.profile_image_size,
    profile_image_mime_type: user.profile_image_mime_type,
  };
};
