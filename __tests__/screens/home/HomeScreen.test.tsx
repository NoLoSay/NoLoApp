import React from 'react'
import { render } from '@testing-library/react-native'
import HomeScreen from '@source/screens/home/HomeScreen'

describe('HomeScreenTests', () => {
  it('should render correctly', () => {
    const screen = render(<HomeScreen />)
    expect(screen.getByText('Home'))
  })
})
