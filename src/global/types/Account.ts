/**
 * @fileoverview Account type.
 * @module Account
 * @description  Account type.
 * @requires react react-native
 */

import { GeolocationResponse } from '@react-native-community/geolocation'
import { Dispatch, SetStateAction } from 'react'

export interface AccountType {
  email: string
  username: string
  authentified: boolean
  phoneNumber: string
  accessToken: string
  localisation: GeolocationResponse | undefined
}

export interface AccountContextType {
  account: AccountType
  setAccount: Dispatch<SetStateAction<AccountType>>
}
