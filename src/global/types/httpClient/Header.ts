/**
 * @fileoverview Header type.
 * @module Header
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
type HeaderContent =
  | '*/*'
  | 'application/json'
  | 'text/plain'
  | 'text/html'
  | 'application/xml'
  | 'text/xml'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
export interface Header {
  Accept: HeaderAccept
  ContentType: HeaderContent
  Locale: string
}
