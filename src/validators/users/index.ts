import { InvariantError } from '../../exceptions/InvariantError';
import { deleteUserPayloadSchema, postUserPayloadSchema, putUserPayloadSchema } from './schema';

export const userValidator = {
  validatePostUserPayload: (payload: object) => {
    const validationResult = postUserPayloadSchema.validate(payload);

    if (validationResult.error !== undefined) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutUserPayload: (payload: object) => {
    const validationResult = putUserPayloadSchema.validate(payload);

    if (validationResult.error !== undefined) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeleteUserPayload: (payload: object) => {
    const validationResult = deleteUserPayloadSchema.validate(payload);

    if (validationResult.error !== undefined) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};
