import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@global/types/screensProps/AuthStackParams'
import { forgotPassword } from '@helpers/httpClient/auth'
import ConnectionScreen from '@screens/authentificationSection/connection/ConnectionScreen'

jest.mock('@helpers/httpClient/auth')

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

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

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

describe('ConnectionScreenTests', () => {
  const navigation = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Connection'>['navigation']
  const route = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Connection'>['route']

  it('should render correctly', () => {
    const screen = render(
      <RenderWithProviders>
        <ConnectionScreen
          navigation={navigation}
          route={route}
        />
      </RenderWithProviders>
    )
    expect(screen.getByText('Connectez-vous pour continuer'))
  })

  it('should handle correctly the forgotten password', () => {
    const screen = render(
      <RenderWithProviders>
        <ConnectionScreen
          navigation={navigation}
          route={route}
        />
      </RenderWithProviders>
    )
    expect(screen.getByText('Connectez-vous pour continuer'))
    fireEvent.changeText(screen.getByPlaceholderText("Email ou nom d'utilisateur"), '')
    fireEvent.press(screen.getByText('Un trou de mémoire ?'))
    expect(screen.getByText('Veuillez rentrer un email valide'))
    fireEvent.changeText(screen.getByPlaceholderText("Email ou nom d'utilisateur"), 'test@test.fr')
    fireEvent.press(screen.getByText('Un trou de mémoire ?'))
    expect(forgotPassword).toHaveBeenCalledTimes(1)
  })

  it('should handle the social buttons', () => {
    const screen = render(
      <RenderWithProviders>
        <ConnectionScreen
          navigation={navigation}
          route={route}
        />
      </RenderWithProviders>
    )
    expect(screen.getByText('Connectez-vous pour continuer'))
    fireEvent.press(screen.getByText('Un trou de mémoire ?'))
    fireEvent.press(screen.getByText('Un trou de mémoire ?'))
  })
})
