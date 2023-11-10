import React from 'react'
import { render } from '@testing-library/react-native'
import HomeScreen from '@source/screens/home/HomeScreen'
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountElevationEnum, AccountType } from '@source/global/types/Account'
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

interface MockMapViewProps {
  children: React.ReactNode
}

function MockMapView({ children }: MockMapViewProps) {
  return <View>{children}</View>
}

function MockMarker({ children }: MockMapViewProps) {
  return <View>{children}</View>
}

jest.mock('react-native-maps', () => {
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  }
})

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  }
})

describe('HomeScreenTests', () => {
  it('should render correctly', () => {
    const user: AccountType = {
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
    }

    const contextValue = { account: user, setAccount: jest.fn() }

    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <HomeScreen />
      </AccountContext.Provider>
    )
    expect(screen.getByText('Meilleurs lieux'))
  })
})
