import { createContext } from 'react'
import { AccountContextType, AccountType } from '@global/types/Account'

export const defaultAccount: AccountType = {
  authentified: false,
  email: '',
  phoneNumber: '',
  username: '',
}

export const AccountContext = createContext<AccountContextType>({
  account: defaultAccount,
  setAccount: () => {},
})
