import React from 'react'
import { render } from '@testing-library/react-native'
import HomeScreen from '@source/screens/home/HomeScreen'
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import { Text, View } from 'react-native'
import PlacesMapView from '@source/screens/home/MapView/MapView'
import { PlaceType, PlaceTag } from '@source/global/types/Places'
import defaultUser from '__mocks__/account'

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

jest.mock('@react-native-community/geolocation', () => {
  return {
    getCurrentPosition: jest.fn(),
  }
})

function MockMapView({ children }: any) {
  return (
    <>
      <Text>MapView</Text>
      <View>{children}</View>
    </>
  )
}

function MockMarker({ children }: any) {
  return (
    <>
      <Text>Marker</Text>
      <View>{children}</View>
    </>
  )
}

jest.mock('react-native-maps', () => {
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  }
})

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

const user: AccountType = defaultUser
const contextValue = { account: user, setAccount: jest.fn() }

describe('MapScreenTests', () => {
  it('should render correctly', () => {
    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <PlacesMapView
          places={[
            {
              id: 1,
              name: 'Château des ducs de Bretagne',
              longDescription:
                "Le Château des Ducs de Bretagne est une imposante forteresse entourée de douves et de remparts, offrant une vue impressionnante dès l'approche. Sa construction a débuté au XIIIe siècle sous Pierre Mauclerc et a été achevée au XVe siècle par François II. Il incarne la puissance et le prestige des ducs de Bretagne. À l'intérieur de ses murs, on découvre un mélange captivant d'architecture médiévale et de style Renaissance, créant une atmosphère unique. Le château abrite aujourd'hui un musée qui raconte l'histoire de Nantes et de la Bretagne, avec des expositions interactives, des artefacts historiques et des maquettes impressionnantes.",
              shortDescription:
                'Forteresse historique, ancien siège des ducs de Bretagne, mêlant architecture médiévale et musée captivant.',
              image:
                'https://www.chateaunantes.fr/wp-content/uploads/2020/02/Musee-dhistoire-de-Nantes.-Nantes-©-David-Gallard-_-LVAN-1800x1200.jpg',
              address: '4 Place Marc Elder, 44000 Nantes',
              phone: '02 51 17 49 48',
              email: 'chateau@nantes.fr',
              website: 'https://www.chateaunantes.fr/fr',
              coordinates: {
                latitude: 47.215833,
                longitude: -1.55,
              },
              type: PlaceType.MUSEUM,
              price: 0,
              city: 'Nantes',
              country: 'France',
              tags: [
                { name: PlaceTag.NO_LOSAY, id: 1 },
                { name: PlaceTag.BLIND, id: 2 },
                { name: PlaceTag.DEAF, id: 3 },
                { name: PlaceTag.DISABLED, id: 4 },
              ],
            },
            {
              id: 2,
              name: 'Hellfest',
              shortDescription:
                'Festival de musique métal de renommée mondiale, attirant des fans passionnés et offrant des performances exceptionnelles.',
              longDescription:
                "Hellfest est un festival de musique métal qui prend place dans un cadre pittoresque à Clisson, une charmante ville de l'ouest de la France. Ce festival, créé en 2006, est devenu rapidement l'un des événements incontournables pour les amateurs de métal, offrant une programmation variée allant du heavy metal au black metal, en passant par le death metal et le doom metal. Chaque année, des milliers de fans se réunissent pour célébrer la musique métal dans une atmosphère de camaraderie et de passion.",
              image: 'https://lecanalauditif.ca/wp-content/uploads/2021/01/Hellfest-.jpg',
              address: 'Rue du Champ Louet, 44190 Clisson',
              phone: '02 51 17 49 48',
              email: 'hellfest@hellfest.fr',
              website: 'https://www.hellfest.fr',
              coordinates: {
                latitude: 47.09750371051718,
                longitude: -1.2700803720514064,
              },
              type: PlaceType.PUBLIC,
              price: 105,
              city: 'Clisson',
              country: 'France',
              tags: [
                { name: PlaceTag.NO_LOSAY, id: 1 },
                { name: PlaceTag.BLIND, id: 2 },
                { name: PlaceTag.DISABLED, id: 4 },
              ],
            },
          ]}
          navigation={mockedNavigate}
        />
      </AccountContext.Provider>
    )
    expect(mockedNavigate).toHaveBeenCalledTimes(0)
    expect(screen.getByText('MapView'))
    expect(screen.getAllByText('Marker')).toHaveLength(2)
  })

  it('should render correctly with no markers', () => {
    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <PlacesMapView
          places={[]}
          navigation={mockedNavigate}
        />
      </AccountContext.Provider>
    )
    expect(mockedNavigate).toHaveBeenCalledTimes(0)
    expect(screen.getByText('MapView'))
    expect(screen.queryByText('Marker')).toBeNull()
  })
})
