import { type OAuth2Client } from 'google-auth-library';
import config from '.';
import { google } from 'googleapis';

let oauth2Client: OAuth2Client | null = null;

const googleOauth2Promise = async (): Promise<OAuth2Client> => {
  if (oauth2Client !== null) {
    return (oauth2Client);
  }

  return await new Promise((resolve, reject) => {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `http://${config.app.host}:${config.app.port}/api/oauth/google/callback`
    );

    oauth2Client = client;
    resolve(oauth2Client);
  });
};

export const getOauth2Client = async (): Promise<OAuth2Client> => {
  return oauth2Client ?? await googleOauth2Promise();
};

export const getAuthorizationUrl = async (): Promise<string > => {
  const client = await getOauth2Client();

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  return client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
  });
};
