const { hash, compare } = require("bcryptjs");
const { createHmac } = require("crypto");

exports.doHash = (value, saltValue) => {
  const response = hash(value, saltValue);
  return response;
};

exports.doHashValidation = (value, hashedValue) => {
  const response = compare(value, hashedValue);
  return response;
};

exports.hmacProcess = (value, secretKey) => {
  const key =
    secretKey || process.env.HMAC_VERIFICATION_CODE_SECRET;

  if (!key) {
    throw new Error("HMAC secret is not configured");
  }

  return createHmac("sha256", key)
    .update(value)
    .digest("hex");
};
