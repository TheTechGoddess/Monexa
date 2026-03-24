const express = require("express");
const userController = require("../controllers/userController");
const { identifier } = require("../middlewares/identification");

const router = express.Router();

router.get("/me", identifier, userController.getMe);
router.patch("/me", identifier, userController.patchMe);
router.patch(
  "/me/profile-image",
  identifier,
  express.raw({ type: ["application/octet-stream", "image/*"], limit: "2mb" }),
  userController.uploadProfileImage,
);

module.exports = router;
