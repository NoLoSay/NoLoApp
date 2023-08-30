/**
 * @fileoverview Authentication helper functions.
 * @module Auth
 * @description Helper functions for authentication.
 * @requires @global/types/httpClient/Header
 */

import { Header } from '@source/global/types/httpClient/Header'
import { post } from './common'

interface SubscribeProps {
  url?: string
  email: string
  username?: string
  password: string
  headers?: Header
}

interface ConnectProps {
  url?: string
  email: string
  password: string
  headers?: Header
}

interface ForgotPasswordProps {
  url?: string
  email: string
  headers?: Header
}

/**
 * @function subscribe Send the user's email and password to the server to subscribe them to the app.
 * @param param Object containing the url, email, username, password, and headers.
 * @param param.url The url to send the request to.
 * @param param.email The user's email.
 * @param param.username The user's username.
 * @param param.password The user's password.
 * @param param.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export async function subscribe({ email, password }: SubscribeProps): Promise<Response> {
  return post({
    endpoint: '/users',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

/**
 * @function connect Send the user's email and password to the server to connect them to the app.
 * @param param Object containing the url, email, username, password, and headers.
 * @param param.url The url to send the request to.
 * @param param.username The user's username.
 * @param param.password The user's password.
 * @param param.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export async function connect({ email, password }: ConnectProps): Promise<Response> {
  return post({
    endpoint: '/users/login',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

/**
 * @function forgotPassword Send the user's email to the server to reset their password.
 * @param param0 email The user's email.
 */
export async function forgotPassword({ email }: ForgotPasswordProps): Promise<Response> {
  console.log('Password forgotten', email)
}
