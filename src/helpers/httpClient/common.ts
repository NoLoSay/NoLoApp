/**
 * @fileoverview Http helper functions.
 * @module common
 * @description Helper functions for http requests
 * @requires react react-native
 * @requires @global/types/httpClient/Header
 */

import { Header } from '@global/types/httpClient/Header'
import { NativeModules, Platform } from 'react-native'

const API_ENDPOINT = 'http://api.nolosay.com:3001'

export const defaultHeaders: Header = {
  Accept: '*/*',
  ContentType: 'application/json',
  Locale:
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier,
}

interface PostProps {
  url?: string
  endpoint: `/${string}`
  body: string
  headers?: Header
}

/**
 * @function post
 * @description Send a POST request to the server.
 * @param props Object containing the url, endpoint, body, and headers.
 * @param props.url The url to send the request to. Defaults to 'http://api.nolosay.com:3001'
 * @param props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param props.body The body to send with the request.
 * @param props.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export function post({ url = API_ENDPOINT, endpoint, body, headers = defaultHeaders }: PostProps): Promise<Response> {
  return requestServer({
    url,
    endpoint,
    method: 'POST',
    headers,
    body,
  })
}

interface GetProps {
  url?: string
  endpoint: `/${string}`
  headers?: Header
}

/**
 * @function get
 * @description Send a GET request to the server.
 * @param props Object containing the url, endpoint, and headers.
 * @param props.url The url to send the request to. Defaults to 'http://api.nolosay.com:3001'
 * @param props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param props.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export function get({ url = API_ENDPOINT, endpoint, headers = defaultHeaders }: GetProps): Promise<Response> {
  return requestServer({
    url,
    endpoint,
    method: 'GET',
    headers,
  })
}

interface RequestServerProps {
  url: string
  endpoint: `/${string}`
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  headers: Header
  body?: string
}

/**
 * @function requestServer
 * @description Send a request to the server.
 * @param Props Object containing the url, endpoint, method, headers, and body.
 * @param Props.url The url to send the request to. Defaults to 'http://api.nolosay.com:3001'
 * @param Props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param Props.method The method to use for the request.
 * @param Props.headers The headers to send with the request.
 * @param Props.body The body to send with the request.
 * @returns Promise of a Response object
 */
export function requestServer({
  url = API_ENDPOINT,
  endpoint,
  method,
  headers,
  body,
}: RequestServerProps): Promise<Response> {
  return fetch(url + endpoint, {
    method,
    headers: {
      Accept: headers.Accept,
      'Content-Type': headers.ContentType,
      Locale: headers.Locale,
    },
    body,
  })
}
