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

export interface AccountContextType {
  account: AccountType
  setAccount: Dispatch<SetStateAction<AccountType>>
}
