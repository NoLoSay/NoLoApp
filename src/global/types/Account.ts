/**
 * @fileoverview Account type.
 * @module Account
 * @description  Account type.
 * @requires react react-native
 */

import { Dispatch, SetStateAction } from 'react'

export interface AccountType {
  email: string
  username: string
  authentified: boolean
  phoneNumber: string
  accessToken: string
}

export interface AccountContextType {
  account: AccountType
  setAccount: Dispatch<SetStateAction<AccountType>>
}
