import React from 'react'
import { Text, View } from 'react-native'
import { render } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccountContext } from '@global/contexts/AccountProvider'
import { AccountElevationEnum, AccountType } from '@global/types/Account'
import { PlaceType, PlaceTag } from '@global/types/Places'
import PlacesMapView from '@screens/home/MapView/MapView'

const defaultUser: AccountType = {
  accountID: 1,
  uuid: 'de3a1a8d-12bb-53f7-8f73-0e0240b49599',
  email: 'toto@tata.com',
  username: 'toto',
  phoneNumber: '+330612345678',
  accessToken: '123456789',
  localisation: {
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: 10,
      accuracy: 1,
      altitudeAccuracy: 1,
      heading: 2,
      speed: 232,
    },
    timestamp: 12729024,
  },
  elevation: AccountElevationEnum.ADMIN,
  name: {
    firstName: 'Prénom',
    lastName: 'Nom',
  },
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQEdoqnWbsHEyqwdFv4iUu5Ug5XpFZWFL5g&usqp=CAU',
  createdAt: new Date(),
}

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

const createTestQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // turn off retries for testing
      },
    },
  })
  return queryClient
}

function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = createTestQueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

interface MockMapViewProps {
  children: React.ReactNode
}

function MockMapView({ children }: MockMapViewProps) {
  return (
    <>
      <Text>MapView</Text>
      <View>{children}</View>
    </>
  )
}

function MockMarker({ children }: MockMapViewProps) {
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
        <QueryProvider>
          <PlacesMapView
            places={[
              {
                id: 1,
                name: 'Château des ducs de Bretagne',
                longDescription:
                  "Le Château des Ducs de Bretagne est une imposante forteresse entourée de douves et de remparts, offrant une vue impressionnante dès l'approche. Sa construction a débuté au XIIIe siècle sous Pierre Mauclerc et a été achevée au XVe siècle par François II. Il incarne la puissance et le prestige des ducs de Bretagne. À l'intérieur de ses murs, on découvre un mélange captivant d'architecture médiévale et de style Renaissance, créant une atmosphère unique. Le château abrite aujourd'hui un musée qui raconte l'histoire de Nantes et de la Bretagne, avec des expositions interactives, des artefacts historiques et des maquettes impressionnantes.",
                shortDescription:
                  'Forteresse historique, ancien siège des ducs de Bretagne, mêlant architecture médiévale et musée captivant.',
                picture:
                  'https://www.chateaunantes.fr/wp-content/uploads/2020/02/Musee-dhistoire-de-Nantes.-Nantes-©-David-Gallard-_-LVAN-1800x1200.jpg',
                address: {
                  street: 'Place Marc Elder',
                  number: '4',
                  postalCode: '44000',
                  city: 'Nantes',
                  country: 'France',
                  latitude: 47.214167,
                  longitude: -1.556944,
                },
                phone: '02 51 17 49 48',
                email: 'chateau@nantes.fr',
                website: 'https://www.chateaunantes.fr/fr',
                type: PlaceType.MUSEUM,
                price: 0,
                city: 'Nantes',
                country: 'France',
                tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
              },
              {
                id: 2,
                name: 'Hellfest',
                shortDescription:
                  'Festival de musique métal de renommée mondiale, attirant des fans passionnés et offrant des performances exceptionnelles.',
                longDescription:
                  "Hellfest est un festival de musique métal qui prend place dans un cadre pittoresque à Clisson, une charmante ville de l'ouest de la France. Ce festival, créé en 2006, est devenu rapidement l'un des événements incontournables pour les amateurs de métal, offrant une programmation variée allant du heavy metal au black metal, en passant par le death metal et le doom metal. Chaque année, des milliers de fans se réunissent pour célébrer la musique métal dans une atmosphère de camaraderie et de passion.",
                picture: 'https://lecanalauditif.ca/wp-content/uploads/2021/01/Hellfest-.jpg',
                address: {
                  street: 'Rue du Champ Louet',
                  number: '1',
                  postalCode: '44190',
                  city: 'Clisson',
                  country: 'France',
                  latitude: 47.09750371051718,
                  longitude: -1.2700803720514064,
                },
                phone: '02 51 17 49 48',
                email: 'hellfest@hellfest.fr',
                website: 'https://www.hellfest.fr',
                type: PlaceType.PUBLIC_PLACE,
                price: 105,
                city: 'Clisson',
                country: 'France',
                tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
              },
            ]}
            navigation={mockedNavigate}
          />
        </QueryProvider>
      </AccountContext.Provider>
    )
    expect(mockedNavigate).toHaveBeenCalledTimes(0)
    expect(screen.getByText('MapView'))
    expect(screen.getAllByText('Marker')).toHaveLength(2)
  })

  it('should render correctly with no markers', () => {
    const screen = render(
      <AccountContext.Provider value={contextValue}>
        <QueryProvider>
          <PlacesMapView
            places={[]}
            navigation={mockedNavigate}
          />
        </QueryProvider>
      </AccountContext.Provider>
    )
    expect(mockedNavigate).toHaveBeenCalledTimes(0)
    expect(screen.getByText('MapView'))
    expect(screen.queryByText('Marker')).toBeNull()
  })
})
