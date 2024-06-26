/**
 * @fileoverview Account provider component
 * @module AccountProvider
 * @description Provider that stores the account data.
 * @requires react react
 */

import React, { createContext, useMemo, useState } from 'react'
import { AccountContextType, AccountType, AccountElevationEnum, GeolocationResponse } from '@global/types/Account'

// Default localisation data for the account set to Nantes
export const defaultLocalisation: GeolocationResponse = {
  coords: {
    latitude: 47.218371,
    longitude: -1.553621,
    altitude: 0,
    accuracy: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  },
  timestamp: 0,
}

/**
 * @constant defaultAccount Default account data
 * @type {AccountType} defaultAccount
 * @default defaultAccount
 * @description Default account data
 * @property {boolean} authentified Default account authentified
 * @property {string} email Default account email
 * @property {string} phoneNumber Default account phoneNumber
 * @property {string} username Default account username
 * @property {string} accessToken Default account accessToken
 */
export const defaultAccount: AccountType = {
  accountID: 0,
  uuid: '',
  email: '',
  phoneNumber: '',
  username: '',
  accessToken: '',
  localisation: undefined,
  elevation: AccountElevationEnum.USER,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQEdoqnWbsHEyqwdFv4iUu5Ug5XpFZWFL5g&usqp=CAU',
  name: {
    firstName: 'Prénom',
    lastName: 'Nom',
  },
  createdAt: new Date(2020, 0, 0, 0, 0, 0, 0),
}

/**
 * @function AccountContext
 * @description Context that stores the account data.
 * @param {AccountContextType} props AccountContext props
 * @param {AccountType} props.account AccountContext account
 * @param {React.Dispatch<React.SetStateAction<AccountType>>} props.setAccount AccountContext setAccount
 * @returns {React.Context<AccountContextType>} AccountContext
 */
export const AccountContext = createContext<AccountContextType>({
  account: defaultAccount,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccount: () => {},
})

/**
 * @interface AccountProviderProps
 * @description AccountProvider component props
 * @extends {React.PropsWithChildren<React.ReactNode>} React children
 * @property {React.ReactNode} children AccountProvider children
 */
interface AccountProviderProps {
  children: React.ReactNode
}

/**
 * @function AccountProvider
 * @description Component that provides the account data.
 * @param {AccountProviderProps} props AccountProvider props
 * @param {React.ReactNode} props.children AccountProvider children
 * @returns {React.JSX.Element} AccountContext provider
 */
export function AccountProvider({ children }: AccountProviderProps): React.JSX.Element {
  const [account, setAccount] = useState<AccountType>(defaultAccount)

  const memoizedContextValue = useMemo(() => ({ account, setAccount }), [account])

  return <AccountContext.Provider value={memoizedContextValue}>{children}</AccountContext.Provider>
}
