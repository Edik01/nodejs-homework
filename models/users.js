const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
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

userSchema.post("save", handleMongooseError);
const registerUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const updateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const userSchemas = { registerUserSchema, loginUserSchema, updateSubscription };

const User = model("User", userSchema);

module.exports = {
  userSchemas,
  User,
};
