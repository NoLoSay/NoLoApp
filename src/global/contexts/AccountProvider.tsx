/**
 * @fileoverview Account provider component
 * @module AccountProvider
 * @description Provider that stores the account data.
 * @requires react react
 */

import React, { createContext, useMemo, useState } from 'react'
import { AccountContextType, AccountType } from '@global/types/Account'

export const defaultAccount: AccountType = {
  authentified: false,
  email: '',
  phoneNumber: '',
  username: '',
}

/**
 * @function AccountContext
 * @description Context that stores the account data.
 * @returns {React.Context<AccountContextType>} AccountContext
 */
export const AccountContext = createContext<AccountContextType>({
  account: defaultAccount,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccount: () => {},
})

interface AccountProviderProps {
  children: React.ReactNode
}

/**
 * @function AccountProvider
 * @description Component that provides the account data.
 * @returns {React.JSX.Element} AccountContext provider
 */
export function AccountProvider({ children }: AccountProviderProps): React.JSX.Element {
  const [account, setAccount] = useState<AccountType>(defaultAccount)

  const memoizedContextValue = useMemo(() => ({ account, setAccount }), [account])

  return <AccountContext.Provider value={memoizedContextValue}>{children}</AccountContext.Provider>
}
