interface GoogleOauthDTO {
  accessToken: string
  refreshToken: string
  idToken: string
}

interface GoogleUserInfo {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}
