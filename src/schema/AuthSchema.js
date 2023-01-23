import joi from "joi"

export const registerSchema = joi.object({
  name: joi.string().required().min(3).max(20),
  email: joi.string().email().required(),
  password: joi.string().required().min(5),
  confirmPassword: joi.string().valid(joi.ref('password')).required().min(5)
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(5),
});

