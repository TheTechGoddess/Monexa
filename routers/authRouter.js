const express = require("express");
const authController = require("../controllers/authController");
const { identifier } = require("../middlewares/identification");
const { authLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// authentication
router.post("/signup", authLimiter, authController.signup);
router.post("/login", authLimiter, authController.login);
router.post("/logout", identifier, authController.logout);

// email verification
router.patch(
  "/send-verification-code",
  authLimiter,
  authController.sendVerificationCode,
);
router.patch(
  "/verify-verification-code",
  authController.verifyVerificationCode,
);

// password management
router.patch("/change-password", identifier, authController.changePassword);
router.patch(
  "/send-forgot-password-code",
  authLimiter,
  authController.sendForgotPasswordCode,
);
router.patch(
  "/verify-forgot-password-code",
  authController.verifyForgotPasswordCode,
);

module.exports = router;
