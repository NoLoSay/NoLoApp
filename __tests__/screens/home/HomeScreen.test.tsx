import React from 'react'
import { render } from '@testing-library/react-native'
import HomeScreen from '@source/screens/home/HomeScreen'
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import { View } from 'react-native'

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')

  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en-US',
      AppleLanguages: ['fr-FR', 'en-US'],
    },
  }
  return RN
})

jest.mock('@react-native-community/geolocation', () => {
  return {
    getCurrentPosition: jest.fn(),
  }
})

function MockMapView(props: any) {
  // eslint-disable-next-line react/destructuring-assignment
  return <View>{props.children}</View>
}

function MockMarker(props: any) {
  // eslint-disable-next-line react/destructuring-assignment
  return <View>{props.children}</View>
}

jest.mock('react-native-maps', () => {
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  }
})

describe('HomeScreenTests', () => {
  it('should render correctly', () => {
    const user: AccountType = {
      authentified: true,
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
