import React from 'react'
import { render } from '@testing-library/react-native'
import ActionsScreen from '@screens/addSection/ActionsScreen/ActionsScreen'

const mockedNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  }
})

describe('AddScreenTests', () => {
  it('should render correctly', () => {
    const screen = render(<ActionsScreen />)
    expect(screen.getByText('Ajouter du contenu'))
  })
})
