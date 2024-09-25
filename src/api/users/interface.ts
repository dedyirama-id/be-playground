import type { PostUserDomain } from '../../types/domain/PostUserDomain';
import type { UserDto } from '../../types/dto/userDto';

export interface UserRepositoriesInterface {
  addUser: (data: PostUserDomain) => Promise<UserDto>
}

export interface validatorInterface {
  validatePostUserPayload: (payload: object) => void
}
