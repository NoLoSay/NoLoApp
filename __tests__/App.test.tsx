import React from 'react'
import App from '@source/AuthRouter'
import { render, screen } from '@testing-library/react-native'

test('renders correctly', () => {
  render(<App />)

  expect(screen.getByText('Open up App.tsx to start working on your app!'))
})
