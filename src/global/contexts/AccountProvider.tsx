import React, { createContext, useMemo, useState } from 'react'
import { AccountContextType, AccountType } from '@global/types/Account'

export const defaultAccount: AccountType = {
  authentified: false,
  email: '',
  phoneNumber: '',
  username: '',
}

const AccountContext = createContext<AccountContextType>({
  account: defaultAccount,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccount: () => {},
})

interface AccountProviderProps {
  children: React.ReactNode
}

function AccountProvider({ children }: AccountProviderProps) {
  const [account, setAccount] = useState<AccountType>(defaultAccount)

  const memoizedContextValue = useMemo(() => ({ account, setAccount }), [account])

  return <AccountContext.Provider value={memoizedContextValue}>{children}</AccountContext.Provider>
}

export { AccountProvider, AccountContext }
