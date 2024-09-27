import qs from 'qs';
import config from '../../config';
import axios from 'axios';

export class GoogleOauthService {
  readonly authUri = config.oauth.google.authBaseUrl + '?' + qs.stringify({
    client_id: config.oauth.google.clientId,
    redirect_uri: config.oauth.google.redirectUri,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
    prompt: 'select_account'
  });

  async getUserToken (code: string): Promise<GoogleOauthDTO> {
    const { data } = await axios.post(`${config.oauth.google.oauth2TokenEndPoint}?${qs.stringify({
    code,
    client_id: config.oauth.google.clientId,
    client_secret: config.oauth.google.clientSecret,
    redirect_uri: config.oauth.google.redirectUri,
    grant_type: 'authorization_code'
  })}`, {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      idToken: data.id_token
    };
  };

  async getUserInfo (googleAccessToken: string): Promise<GoogleUserInfo> {
    const { data } = await axios.get(config.oauth.google.googleapisUrl, {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`
      }
    });

    return data;
  };
};
