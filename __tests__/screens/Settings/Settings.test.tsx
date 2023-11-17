import React from 'react'
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountElevationEnum, AccountType } from '@source/global/types/Account'
import HomeScreen from '@source/screens/home/HomeScreen'
import { render } from '@testing-library/react-native'
import SettingsScreen from '@source/screens/settings/SettingsScreen'

const defaultUser: AccountType = {
  accountID: 1,
  email: 'toto@tata.com',
  username: 'toto',
  phoneNumber: '+330612345678',
  accessToken: '123456789',
  localisation: {
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: 10,
      accuracy: 1,
      altitudeAccuracy: 1,
      heading: 2,
      speed: 232,
    },
    timestamp: 12729024,
  },
  elevation: AccountElevationEnum.ADMIN,
  name: {
    firstName: 'Prénom',
    lastName: 'Nom',
  },
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQEdoqnWbsHEyqwdFv4iUu5Ug5XpFZWFL5g&usqp=CAU',
}

const mockedNavigate = jest.fn()

describe('Settings screen test', () => {
  it('should render correctly', () => {
    const contextValue = { account: defaultUser, setAccount: jest.fn() }

    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <SettingsScreen navigation={mockedNavigate} />
      </AccountContext.Provider>
    )
    expect(screen.getByText(`${defaultUser.name.firstName} ${defaultUser.name.lastName}`))
    expect(screen.getByText(`@${defaultUser.username}`))
  })
})
