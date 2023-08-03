/**
 * @fileoverview Authentication helper functions.
 * @module Auth
 * @description Helper functions for authentication.
 * @requires react react-native
 * @requires @global/types/httpClient/Header
 */

import { Header } from '@global/types/httpClient/Header'
import { NativeModules, Platform } from 'react-native'

interface SubscribeProps {
  url: string
  email: string
  username?: string
  password: string
  headers?: Header
}

const defaultHeaders: Header = {
  Accept: '*/*',
  ContentType: 'application/json',
  Locale:
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier,
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
export default async function subscribe({
  url,
  email,
  username = email,
  password,
  headers = defaultHeaders,
}: SubscribeProps): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: headers.Accept,
      'Content-Type': headers.ContentType,
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
}
