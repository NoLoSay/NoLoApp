/**
 * @fileoverview Authentication helper functions.
 * @module Auth
 * @description Helper functions for authentication.
 */

import { Header } from '@global/types/httpClient/Header'
import RegisterJSON from '@global/types/httpClient/auth/Registration'
import ConnectionJSON from '@global/types/httpClient/auth/Connection'
import ChangePasswordJSON from '@global/types/httpClient/auth/ChangePassword'
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

interface ChangePasswordProps {
  url?: string
  token: string
  newPassword: string
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

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    return {
      json: {
        id: responseData.id,
        uuid: responseData.uuid,
        username: responseData.username,
        email: responseData.email,
        picture: responseData.picture,
        telNumber: responseData.telNumber,
        role: responseData.activeProfile.role,
        accessToken: responseData.accessToken,
        createdAt: responseData.createdAt,
      },
      status: response.status,
      message: responseData.message,
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

/**
 * @function forgotPassword Send the user's email to the server to reset their password.
 * @param email email The user's email.
 */
export async function forgotPassword({ email }: ForgotPasswordProps): Promise<Response> {
  return await post({
    endpoint: '/auth/forgot-password',
    body: JSON.stringify({
      email,
    }),
  })
}

/**
 * @function changePassword Send the user's email and new password to the server to change their password.
 * @param props Object containing the email and new password.
 * @param props.token The user's token.
 * @param props.newPassword The user's new password.
 * @returns Promise of a Response object
 */
export async function changePassword({ token, newPassword }: ChangePasswordProps): Promise<ChangePasswordJSON> {
  try {
    const response = await post({
      endpoint: '/auth/change-password',
      body: JSON.stringify({
        token,
        password: newPassword,
      }),
    })
    console.log(response)
    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    return {
      status: response.status,
      message: responseData.message,
    }
  } catch {
    throw new Error('Error changing password')
  }
}
