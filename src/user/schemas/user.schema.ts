import * as Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  isActive: Joi.boolean(),
});
