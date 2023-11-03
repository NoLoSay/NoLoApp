/**
 * @fileoverview Account provider component
 * @module AccountProvider
 * @description Provider that stores the account data.
 * @requires react react
 */

import React, { createContext, useMemo, useState } from 'react'
import { AccountContextType, AccountType, AccountElevationEnum } from '@global/types/Account'

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
  authentified: false,
  email: '',
  phoneNumber: '',
  username: '',
  accessToken: '',
  localisation: undefined,
  elevation: AccountElevationEnum.USER,
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
