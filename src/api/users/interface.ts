import type { PostUserDomain } from '../../types/domain/PostUserDomain';
import type { UserDto } from '../../types/dto/userDto';

export interface RepositoriesInterface {
  addUser: (data: PostUserDomain) => Promise<UserDto>
  getUserById: (id: string) => Promise<UserDto>
  updateUserById: (id: string, { username, email }: { username: string, email: string }) => Promise<UserDto>
  deleteUserById: (id: string, password: string) => Promise<void>
}

export interface validatorInterface {
  validatePostUserPayload: (payload: object) => void
  validatePutUserPayload: (payload: object) => void
  validateDeleteUserPayload: (payload: object) => void
}
