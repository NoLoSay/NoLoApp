import React from 'react'
import { render } from '@testing-library/react-native'
import HomeScreen from '@source/screens/home/HomeScreen'
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'

describe('HomeScreenTests', () => {
  it('should render correctly', () => {
    const user: AccountType = {
      authentified: true,
      email: 'toto@tata.com',
      username: 'toto',
      phoneNumber: '+330612345678',
    }

    const contextValue = { account: user, setAccount: jest.fn() }

    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <HomeScreen />
      </AccountContext.Provider>
    )
    expect(screen.getByText(user.username))
  })
})
