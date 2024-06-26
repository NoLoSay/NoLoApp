import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { AccountContext } from '@global/contexts/AccountProvider'
import { AccountElevationEnum, AccountType } from '@global/types/Account'
import SettingsScreen from '@screens/settingsSection/settingsScreen/SettingsScreen'

const mockDefaultUser: AccountType = {
  accountID: 1,
  uuid: '753456c8-e53e-11ee-ab2d-365c7c2740da',
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
  createdAt: new Date(2020, 0, 0, 0, 0, 0, 0),
}

const mockedNavigate = jest.fn()

const mockLogoutUser = jest.fn()
const mockAboutApp = jest.fn()
const mockOpenTerms = jest.fn()
const mockShowHelpModal = jest.fn()
const mockShowModal = jest.fn()

jest.mock('@screens/settingsSection/settingsScreen/useSettingsScreenController', () => {
  return jest.fn().mockImplementation(() => {
    return {
      account: mockDefaultUser,
      firstName: mockDefaultUser.name.firstName,
      lastName: mockDefaultUser.name.lastName,
      username: mockDefaultUser.username,
      showModal: mockShowModal,
      showHelpModal: mockShowHelpModal,
      logoutUser: mockLogoutUser,
      aboutApp: mockAboutApp,
      openTerms: mockOpenTerms,
    }
  })
})

describe('Settings screen test', () => {
  it('should render correctly', () => {
    const contextValue = { account: mockDefaultUser, setAccount: jest.fn() }

    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <SettingsScreen navigation={mockedNavigate} />
      </AccountContext.Provider>
    )
    expect(screen.getByText(`${mockDefaultUser.email}`))
    expect(screen.getByText(`@${mockDefaultUser.username}`))
  })

  it('buttons should act normally', () => {
    const contextValue = { account: mockDefaultUser, setAccount: jest.fn() }

    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <SettingsScreen navigation={mockedNavigate} />
      </AccountContext.Provider>
    )
    fireEvent.press(screen.getByText('Aide et support'))
    fireEvent.press(screen.getByText("À propos de l'application"))
    fireEvent.press(screen.getByText('CGU'))
    fireEvent.press(screen.getByText('Se déconnecter'))
    expect(mockShowHelpModal).toHaveBeenCalledTimes(1)
    expect(mockAboutApp).toHaveBeenCalledTimes(1)
    expect(mockLogoutUser).toHaveBeenCalledTimes(1)
    expect(mockOpenTerms).toHaveBeenCalledTimes(1)
  })
})
