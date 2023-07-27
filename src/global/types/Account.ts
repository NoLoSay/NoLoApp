export interface AccountType {
  email: string
  username: string
  authentified: boolean
  phoneNumber: string
}

export interface AccountContextType {
  account: AccountType
  setAccount: (account: AccountType) => void
}
