import joi from "joi"

export const entrySchema = joi.object({
  value: joi.number().required().min(1),
  description: joi.string().required().min(2),
});

export const exitSchema = joi.object({
  value: joi.number().required().min(1),
  description: joi.string().required().min(2),
});