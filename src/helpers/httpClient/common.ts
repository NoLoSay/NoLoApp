/**
 * @fileoverview Http helper functions.
 * @module common
 * @description Helper functions for http requests
 * @requires react react-native
 */

import { NativeModules, Platform } from 'react-native'
import { API_URL } from '@env'
import { Header } from '@global/types/httpClient/Header'

/**
 * @constant defaultHeaders
 * @description Default headers to send with requests.
 * @type {Header}
 * @default
 * @property {string} Accept - Accept header.
 * @property {string} ContentType - Content-Type header.
 * @property {string} Locale - Locale header.
 */
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
  authorizationToken?: string
}

/**
 * @function post
 * @description Send a POST request to the server.
 * @param props Object containing the url, endpoint, body, and headers.
 * @param props.url The url to send the request to. Defaults to defaultApiURL
 * @param props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param props.body The body to send with the request.
 * @param props.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export function post({
  url = API_URL,
  endpoint,
  body,
  headers = defaultHeaders,
  authorizationToken = '',
}: PostProps): Promise<Response> {
  return requestServer({
    url,
    endpoint,
    method: 'POST',
    headers,
    body,
    authorizationToken,
  })
}

/**
 * @function put
 * @description Send a PUT request to the server.
 * @param props Object containing the url, endpoint, body, and headers.
 * @param props.url The url to send the request to. Defaults to defaultApiURL
 * @param props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param props.body The body to send with the request.
 * @param props.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export function put({
  url = API_URL,
  endpoint,
  body,
  headers = defaultHeaders,
  authorizationToken = '',
}: PostProps): Promise<Response> {
  return requestServer({
    url,
    endpoint,
    method: 'PUT',
    headers,
    body,
    authorizationToken,
  })
}

interface DeleteProps {
  url?: string
  endpoint: `/${string}`
  headers?: Header
  authorizationToken?: string
}

/**
 * @function delete
 * @description Send a DELETE request to the server.
 * @param props Object containing the url, endpoint, body, and headers.
 * @param props.url The url to send the request to. Defaults to defaultApiUrl
 * @param props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param props.body The body to send with the request.
 * @param props.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export function deleteRequest({
  url = API_URL,
  endpoint,
  headers = defaultHeaders,
  authorizationToken = '',
}: DeleteProps): Promise<Response> {
  return requestServer({
    url,
    endpoint,
    method: 'DELETE',
    headers,
    authorizationToken,
  })
}

interface GetProps {
  url?: string
  endpoint: `/${string}`
  headers?: Header
  authorizationToken?: string
}

/**
 * @function get
 * @description Send a GET request to the server.
 * @param props Object containing the url, endpoint, and headers.
 * @param props.url The url to send the request to. Defaults to defaultApiURL
 * @param props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param props.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export function get({
  url = API_URL,
  endpoint,
  headers = defaultHeaders,
  authorizationToken = '',
}: GetProps): Promise<Response> {
  return requestServer({
    url,
    endpoint,
    method: 'GET',
    headers,
    authorizationToken,
  })
}

interface RequestServerProps {
  url: string
  endpoint: `/${string}`
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  headers: Header
  body?: string
  authorizationToken?: string
}

/**
 * @function requestServer
 * @description Send a request to the server.
 * @param Props Object containing the url, endpoint, method, headers, and body.
 * @param Props.url The url to send the request to. Defaults to defaultApiURL
 * @param Props.endpoint The endpoint to send the request to. Must start with a '/'.
 * @param Props.method The method to use for the request.
 * @param Props.headers The headers to send with the request.
 * @param Props.body The body to send with the request.
 * @returns Promise of a Response object
 */
export function requestServer({
  url = API_URL,
  endpoint,
  method,
  headers,
  body,
  authorizationToken,
}: RequestServerProps): Promise<Response> {
  if (__DEV__) console.log('finalURL:', url + endpoint)
  return fetch(url + endpoint, {
    method,
    headers: {
      Accept: headers.Accept,
      'Content-Type': headers.ContentType,
      Locale: headers.Locale,
      Authorization: `Bearer ${authorizationToken}`,
    },
    body,
  })
}
