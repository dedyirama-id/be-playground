import { InvariantError } from '../../../exceptions/InvariantError';
import { postUserPayloadSchema } from './schema';

export const validator = {
  validatePostUserPayload: (payload: object) => {
    const validationResult = postUserPayloadSchema.validate(payload);

    if (validationResult.error !== undefined) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};
