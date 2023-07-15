const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseErrors } = require("../helpers");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2-3}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlenhth: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseErrors);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(["starter", "pro", "business"]),
});

const schemas = {
  registerSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};