export interface UseCaseInterface {
  registerNewUser: ({ username, password, email }: PostUserDomain) => Promise<UserDto>
  getUserById: (id: string) => Promise<UserDto>
  getUserByEmail: (id: string) => Promise<UserDto>
  updateUserById: (id: string, newData: PostUserDomain) => Promise<UserDto>
  deleteUserById: (id: string, password: string) => Promise<void>
  verifyUserCredentials: (id: string, password: string) => Promise<void>
  updateUserGoogleConnection: (id: string, googleRefreshToken: string) => Promise<void>
  searchUserByEmail: (email: string) => Promise<UserDto | null>
}

export interface ServiceInterface {
  authUri: string
  getUserToken: (code: string) => Promise<GoogleOauthDTO>
  getUserInfo: (googleAccessToken: string, idToken: string) => Promise<GoogleUserInfo>
}
