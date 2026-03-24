const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password must be provided!"],
      trim: true,
      select: false,
    },
    first_name: {
      type: String,
      default: null,
      trim: true,
    },
    last_name: {
      type: String,
      default: null,
      trim: true,
    },
    currency: {
      type: String,
      default: null,
      trim: true,
    },
    timezone: {
      type: String,
      default: null,
      trim: true,
    },
    monthly_income: {
      type: [
        {
          company: { type: String, required: true, trim: true },
          income: { type: Number, required: true },
        },
      ],
      default: null,
    },
    tax: {
      type: Number,
      default: null,
    },
    phone_number: {
      type: String,
      default: null,
      trim: true,
    },
    profile_image: {
      type: Buffer,
      default: null,
      select: false,
    },
    profile_image_mime_type: {
      type: String,
      default: null,
      trim: true,
      select: false,
    },
    profile_image_size: {
      type: Number,
      default: 0,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
      select: false,
    },
    verificationCodeValidation: {
      type: Number,
      select: false,
    },
    forgotPasswordCode: {
      type: String,
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: Number,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    lastLogin: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);