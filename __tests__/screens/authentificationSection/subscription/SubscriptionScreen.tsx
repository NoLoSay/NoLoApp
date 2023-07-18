import React from 'react'
import { render } from '@testing-library/react-native'
import SubscriptionScreen from '@source/screens/authentificationSection/subscription/SubscriptionScreen'
import { AuthStackParamList } from '@source/global/types/screensProps/AuthStackParams'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

describe('SubscriptionScreenTests', () => {
  const navigation = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Subscription'>['navigation']
  const route = jest.fn() as unknown as NativeStackScreenProps<AuthStackParamList, 'Subscription'>['route']

  it('should render correctly', () => {
    const screen = render(
      <SubscriptionScreen
        navigation={navigation}
        route={route}
      />
    )
    expect(screen.getByText("S'inscrire"))
  })
})
