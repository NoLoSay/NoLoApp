import React from 'react'
import { render } from '@testing-library/react-native'
import ScanScreen from '@source/screens/scan/ScanScreen'

describe('ScanScreenTests', () => {
  it('should render correctly', () => {
    const screen = render(<ScanScreen />)
    expect(screen.getByText('Scan'))
  })
})
