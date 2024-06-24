import { configDotEnv } from "../../../../../Config/env/env";
configDotEnv()
import axios from 'axios'
import querystring from 'querystring'

// eslint-disable-next-line no-undef
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
// eslint-disable-next-line no-undef
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// eslint-disable-next-line no-undef
export const SERVER_ROOT_URI = process.env.Server_URL
// eslint-disable-next-line no-undef
export const UI_ROOT_URI = process.env.UI_ROOT_URI
// eslint-disable-next-line no-undef
export const TokenSecret = process.env.TokenSecret

export const COOKIE_NAME = 'auth_token'
const redirectURI = 'api/auth/googleget'

export function getGoogleAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }

  return `${rootUrl}?${querystring.stringify(options)}`
}

export function getTokens({ code, clientId, clientSecret, redirectUri }: any) {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = 'https://oauth2.googleapis.com/token'
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  }

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Failed to fetch auth tokens')
      throw new Error(error.message)
    })
}
