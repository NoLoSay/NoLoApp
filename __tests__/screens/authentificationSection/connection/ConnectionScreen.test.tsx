import React from 'react'
import { render } from '@testing-library/react-native'
import ConnectionScreen from '@source/screens/authentificationSection/connection/ConnectionScreen'
import { AuthStackParamList } from '@source/global/types/screensProps/AuthStackParams'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

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
    expect(screen.getByText('Subscription'))
  })
})
