import React from 'react'
import { render } from '@testing-library/react-native'
import ActionsScreen from '@source/screens/addSection/ActionsScreen/ActionsScreen'

describe('AddScreenTests', () => {
  it('should render correctly', () => {
    const screen = render(<ActionsScreen />)
    expect(screen.getByText('Ajouter du contenu'))
  })
})
