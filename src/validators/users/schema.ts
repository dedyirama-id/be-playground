import Joi from 'joi';

export const postUserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const putUserPayloadSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string()
});

export const deleteUserPayloadSchema = Joi.object({
  password: Joi.string()
});
