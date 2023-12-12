import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../../../src/global/types/screensProps/AuthStackParams'
import ConnectionScreen from '../../../../src/screens/authentificationSection/connection/ConnectionScreen'
import { forgotPassword } from '../../../../src/helpers/httpClient/auth'

jest.mock('@source/helpers/httpClient/auth')

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

describe('ConnectionScreenTests', () => {
  const navigation = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Connection'>['navigation']
  const route = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Connection'>['route']

  it('should render correctly', () => {
    const screen = render(
      <ConnectionScreen
        navigation={navigation}
        route={route}
      />
    )
    expect(screen.getByText('Connectez-vous pour continuer'))
  })

  it('should handle correctly the forgotten password', () => {
    const screen = render(
      <ConnectionScreen
        navigation={navigation}
        route={route}
      />
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
      <ConnectionScreen
        navigation={navigation}
        route={route}
      />
    )
    expect(screen.getByText('Connectez-vous pour continuer'))
    fireEvent.press(screen.getByText('Un trou de mémoire ?'))
    fireEvent.press(screen.getByText('Un trou de mémoire ?'))
  })
})
