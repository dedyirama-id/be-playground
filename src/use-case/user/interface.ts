import type { Authentication, User } from '@prisma/client';

export interface UserRepositories {
  addUser: (data: UserRepoDomain) => Promise<User>
  getUserById: (id: string) => Promise<User>
  updateUserById: (id: string, newData: User) => Promise<User>
  deleteUserById: (id: string) => Promise<void>
  getUserByEmail: (email: string) => Promise<User>
  searchUserByEmail: (email: string) => Promise<User | null>
}

export interface AuthenticationRepositories {
  addAuthentication: (userId: string, refreshToken: string) => Promise<Authentication>
  deleteAuthentication: (refreshToken: string) => Promise<void>
}
