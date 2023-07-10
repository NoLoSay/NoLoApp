import React from 'react'
import App from '../App'
import { render, screen } from '@testing-library/react-native'

test('renders correctly', () => {
  render(<App />)

  expect(screen.getByText('App.tsx'))
})
