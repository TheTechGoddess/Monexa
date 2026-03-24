const {
  getCurrentUserService,
  updateCurrentUserService,
  uploadProfileImageService,
} = require("../services/userService");
const { updateUserProfileSchema } = require("../middlewares/validator");

exports.getMe = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await getCurrentUserService(userId);
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

exports.patchMe = async (req, res) => {
  const { userId } = req.user;

  try {
    const { error } = updateUserProfileSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const user = await updateCurrentUserService(userId, req.body);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  const { userId } = req.user;

  try {
    const imageMetadata = await uploadProfileImageService(
      userId,
      req.body,
      req.headers["content-type"],
    );

    res.json({
      success: true,
      message: "Profile image uploaded successfully",
      ...imageMetadata,
    });
  } catch (err) {
    res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }
};
