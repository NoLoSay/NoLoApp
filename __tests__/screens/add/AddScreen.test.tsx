import React from 'react'
import { render } from '@testing-library/react-native'
import AddScreen from '@source/screens/add/AddScreen'

describe('AddScreenTests', () => {
  it('should render correctly', () => {
    const screen = render(<AddScreen />)
    expect(screen.getByText('Add'))
  })
})
