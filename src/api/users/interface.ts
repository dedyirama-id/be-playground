export interface UseCaseInterface {
  registerNewUser: ({ username, password, email }: PostUserDomain) => Promise<UserDto>
  getUserById: (id: string) => Promise<UserDto>
  updateUserById: (id: string, newData: PostUserDomain) => Promise<UserDto>
  deleteUserById: (id: string, password: string) => Promise<void>
  verifyUserCredentials: (id: string, password: string) => Promise<void>
  updateUserGoogleConnection: (id: string, googleRefreshToken: string) => Promise<void>
}

export interface validatorInterface {
  validatePostUserPayload: (payload: object) => void
  validatePutUserPayload: (payload: object) => void
  validateDeleteUserPayload: (payload: object) => void
}
