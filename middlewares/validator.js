const Joi = require("joi");

const passwordSchema = Joi.string()
  .min(8)
  .required()
  .pattern(/[a-z]/, { name: "lowercase" })
  .pattern(/\d/, { name: "digit" })
  .pattern(/[A-Z]/, { name: "uppercase" })
  .pattern(/[!@#$%^&*]/, { name: "special character" })
  .messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.pattern.name": "Password must contain at least one {#name}.",
    "any.required": "Password is required.",
  });

exports.signupSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),

  password: Joi.string()
    .min(8)
    .required()
    .pattern(/[a-z]/, { name: "lowercase" })
    .pattern(/\d/, { name: "digit" })
    .messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.name": "Password must contain at least one {#name}.",
      "any.required": "Password is required.",
    }),
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: false },
    }),

  password: passwordSchema,
});

exports.acceptCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),

  providedCode: Joi.string()
    .length(6) // or whatever length you use
    .required(),
});

exports.changePasswordSchema = Joi.object({
  newPassword: passwordSchema,
  oldPassword: passwordSchema,
});

exports.acceptFPCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  providedCode: Joi.string()
    .length(6) // or whatever length you use
    .required(),
  newPassword: passwordSchema,
});

exports.updateUserProfileSchema = Joi.object({
  first_name: Joi.string().trim().min(1),
  last_name: Joi.string().trim().min(1),
  currency: Joi.string().trim().min(1),
  timezone: Joi.string().trim().min(1),
  monthly_income: Joi.array()
    .items(
      Joi.object({
        company: Joi.string().trim().min(1).required(),
        income: Joi.number().required(),
      }),
    )
    .min(1),
  tax: Joi.number(),
  phone_number: Joi.string().trim().min(1),
})
  .min(1)
  .unknown(false);

exports.createPostSchema = Joi.object({
  title: Joi.string().min(6).max(60).required(),
  description: Joi.string().min(6).max(600).required(),
  userId: Joi.string().required(),
});
