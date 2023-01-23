import joi from "joi"

export const entrySchema = joi.object({
  value: joi.number().required().min(1),
  description: joi.string().required().min(2),
  type:joi.string().valid("Entry", "Exit").required(),
  idUsuario: joi.required(),
});

export const exitSchema = joi.object({
  value: joi.number().required().min(1),
  description: joi.string().required().min(2),
  type:joi.string().valid("Entry", "Exit").required(),
  idUsuario: joi.required(),
});