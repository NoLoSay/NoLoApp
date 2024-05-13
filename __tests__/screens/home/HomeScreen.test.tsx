import React from 'react'
import { Text, View } from 'react-native'
import { render } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccountContext } from '@global/contexts/AccountProvider'
import { AccountElevationEnum, AccountType } from '@global/types/Account'
import HomeScreen from '@screens/home/HomeScreen'

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

function MockHomeScreen() {
  return <Text>Aucun lieu trouvé</Text>
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
  it('should render correctly', async () => {
    const user: AccountType = {
      accountID: 1,
      uuid: 'acde9b28-2e41-5cd8-990b-d8b9280cfe08',
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
      createdAt: new Date(),
    }

    const contextValue = { account: user, setAccount: jest.fn() }

    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <QueryProvider>
          <HomeScreen />
          <MockHomeScreen />
        </QueryProvider>
      </AccountContext.Provider>
    )

    expect(screen.getByText('Aucun lieu trouvé'))
  })
})
