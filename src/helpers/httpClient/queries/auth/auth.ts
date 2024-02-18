/**
 * @fileoverview Authentication helper functions.
 * @module Auth
 * @description Helper functions for authentication.
 */

import { Header } from '@global/types/httpClient/Header'
import RegisterJSON from '@global/types/httpClient/auth/Registration'
import ConnectionJSON from '@global/types/httpClient/auth/Connection'
import { post } from '../../common'

interface SubscribeProps {
  url?: string
  email: string
  username?: string
  password: string
  headers?: Header
}

interface ConnectProps {
  url?: string
  formUsername: string
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
export async function subscribe({ email, username, password }: SubscribeProps): Promise<RegisterJSON> {
  try {
    const response = await post({
      endpoint: '/register',
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    return {
      json: responseData,
      status: response.status,
      message: responseData.message,
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
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
export async function connect({ formUsername, password }: ConnectProps): Promise<ConnectionJSON> {
  try {
    const response = await post({
      endpoint: '/auth/login',
      body: JSON.stringify({
        username: formUsername,
        password,
      }),
    })

    // TODO: Change this to JSON when it will be done in the backend

    // Backend is retuning a string containing the error or the access_token, not a JSON object containing all informations
    const requestText = await response.text()

    if (!response.ok) {
      throw new Error(requestText)
    }

    const data = {
      json: {
        username: formUsername,
        email: formUsername,
        access_token: requestText,
      },
      status: response.status,
      message: requestText,
    }

    return data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

/**
 * @function forgotPassword Send the user's email to the server to reset their password.
 * @param email email The user's email.
 */
export async function forgotPassword({ email }: ForgotPasswordProps): Promise<Response> {
  return new Promise(() => {
    console.log('forgotPassword', email)
  })
}
