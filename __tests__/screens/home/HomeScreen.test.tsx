import React from 'react'
import { View } from 'react-native'
import { render } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccountContext } from '@global/contexts/AccountProvider'
import { AccountElevationEnum, AccountType } from '@global/types/Account'
import HomeScreen from '../../../src/screens/home/HomeScreen'

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

const createTestQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // turn off retries for testing
      },
    },
  })
  return queryClient
}

function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = createTestQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

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
      name: {
        firstName: 'Prénom',
        lastName: 'Nom',
      },
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQEdoqnWbsHEyqwdFv4iUu5Ug5XpFZWFL5g&usqp=CAU',
    }

    const contextValue = { account: user, setAccount: jest.fn() }

    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <QueryProvider>
          <HomeScreen />
        </QueryProvider>
      </AccountContext.Provider>
    )
    expect(screen.getByText('Meilleurs lieux'))
  })
})
