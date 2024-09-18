/**
 * @fileoverview Header type.
 * @module Header
 * @description Header type.
 */

/**
 * @typedef {Object} Header
 * @property {HeaderAccept} Accept - The accept header.
 * @property {HeaderContent} ContentType - The content type header.
 * @property {string} Locale - The locale header.
 * @description Header type.
 */
type HeaderAccept =
  | '*/*'
  | 'application/json'
  | 'text/plain'
  | 'text/html'
  | 'application/xml'
  | 'text/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

/**
 * @typedef {Object} Header
 * @property {HeaderAccept} Accept - The accept header.
 * @property {HeaderContent} ContentType - The content type header.
 * @property {string} Locale - The locale header.
 * @description Header type.
 */
type HeaderContent =
  | '*/*'
  | 'application/json'
  | 'text/plain'
  | 'text/html'
  | 'application/xml'
  | 'text/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

/**
 * @typedef {Object} Header
 * @property {HeaderAccept} Accept - The accept header.
 * @property {HeaderContent} ContentType - The content type header.
 * @property {string} Locale - The locale header.
 */
export interface Header {
  Accept: HeaderAccept
  ContentType: HeaderContent
  Locale: string
}
