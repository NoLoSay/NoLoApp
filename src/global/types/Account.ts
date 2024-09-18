/**
 * @fileoverview Account type.
 * @module Account
 * @description  Account type.
 * @requires react react-native
 */

import { Dispatch, SetStateAction } from 'react'

export type AccountElevation = 'user' | 'admin'

// eslint-disable-next-line no-shadow
export enum AccountElevationEnum {
  USER = 0,
  CREATOR = 1,
  MANAGER = 2,
  MODERATOR = 3,
  ADMIN = 4,
}

/**
 * @typedef {Object} GeolocationResponse
 * @description Default Geolocation response in case of failure, defaults to Nantes.
 */
export const defaultLocalisation: GeolocationResponse = {
  coords: {
    latitude: 47.21725,
    longitude: -1.55336,
    altitude: 14,
    accuracy: 1,
    altitudeAccuracy: 1,
    heading: 1,
    speed: 0,
  },
  timestamp: 123456,
}

/**
 * @typedef {Object} GeolocationResponse
 * @property {Object} coords - The coordinates of the user.
 * @property {number} coords.latitude - The latitude of the user.
 * @property {number} coords.longitude - The longitude of the user.
 * @property {number} coords.altitude - The altitude of the user.
 * @property {number} coords.accuracy - The accuracy of the user.
 * @property {number} coords.altitudeAccuracy - The altitude accuracy of the user.
 * @property {number} coords.heading - The heading of the user.
 * @property {number} coords.speed - The speed of the user.
 * @property {number} timestamp - The timestamp of the response.
 * @description Geolocation response.
 */
export type GeolocationResponse = {
  coords: {
    latitude: number
    longitude: number
    altitude: number | null
    accuracy: number
    altitudeAccuracy: number | null
    heading: number | null
    speed: number | null
  }
  timestamp: number
}

/**
 * @typedef {Object} AccountType
 * @property {number} accountID - The ID of the account.
 * @property {string} uuid - The UUID of the account.
 * @property {string} email - The email of the account.
 * @property {string} username - The username of the account.
 * @property {string} phoneNumber - The phone number of the account.
 * @property {string} accessToken - The access token of the account.
 * @property {GeolocationResponse} localisation - The localisation of the account.
 * @property {AccountElevationEnum} elevation - The elevation of the account.
 * @property {string} image - The image of the account.
 * @property {Object} name - The name of the account.
 * @property {string} name.firstName - The first name of the account.
 * @property {string} name.lastName - The last name of the account.
 * @property {Date} createdAt - The creation date of the account.
 */
export interface AccountType {
  accountID: number
  uuid: string
  email: string
  username: string
  phoneNumber: string
  accessToken: string
  localisation: GeolocationResponse | undefined
  elevation: AccountElevationEnum
  image: string
  name: {
    firstName: string
    lastName: string
  }
  createdAt: Date
}

/**
 * @typedef {Object} AccountContextType
 * @property {AccountType} account - The account.
 * @property {Dispatch<SetStateAction<AccountType>>} setAccount - The setter of the account.
 */
export interface AccountContextType {
  account: AccountType
  setAccount: Dispatch<SetStateAction<AccountType>>
}
