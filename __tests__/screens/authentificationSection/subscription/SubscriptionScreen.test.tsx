import React from 'react'
import { render } from '@testing-library/react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthStackParamList } from '@global/types/screensProps/AuthStackParams'
import SubscriptionScreen from '@screens/authentificationSection/subscription/SubscriptionScreen'

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

function RenderWithProviders({ children }: { children: React.ReactNode }) {
  const queryClient = createTestQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('SubscriptionScreenTests', () => {
  const navigation = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Subscription'>['navigation']
  const route = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Subscription'>['route']

  it('should render correctly', () => {
    const screen = render(
      <RenderWithProviders>
        <SubscriptionScreen
          navigation={navigation}
          route={route}
        />
      </RenderWithProviders>
    )
    expect(screen.getByText('Créer un compte'))
  })
})
