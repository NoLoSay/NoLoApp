/**
 * @fileoverview Account type.
 * @module Account
 * @description  Account type.
 * @requires react react-native
 */

import { GeolocationResponse } from '@react-native-community/geolocation'
import { Dispatch, SetStateAction } from 'react'

export type AccountElevation = 'user' | 'admin'

// eslint-disable-next-line no-shadow
export enum AccountElevationEnum {
  USER = 0,
  ADMIN = 1,
}

export interface AccountType {
  email: string
  username: string
  authentified: boolean
  phoneNumber: string
  accessToken: string
  localisation: GeolocationResponse | undefined
  elevation: AccountElevationEnum
}

export interface AccountContextType {
  account: AccountType
  setAccount: Dispatch<SetStateAction<AccountType>>
}
