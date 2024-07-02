/**
 * @fileoverview Places helper functions.
 * @module Places
 * @description Helper functions to get and handle places.
 */

import PlacesNeedingTranslationJSON, { NoloPlacesJSON } from '@global/types/httpClient/queries/places'
import { Place, ArtToTranslate, PlaceTag, PlaceType } from '@global/types/Places'
import { get } from './common'

const nantes = {
  id: 1,
  name: 'Nantes',
  zip: '44000',
  department: {
    id: 1,
    name: 'Loire-Atlantique',
    country: {
      id: 1,
      name: 'France',
    },
  },
}

const PLACES: Place[] = [
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
      id: 1,
      street: 'Place Marc Elder',
      houseNumber: '4',
      zip: '44000',
      city: nantes,
      latitude: 47.214167,
      longitude: -1.556944,
      otherDetails: '',
    },
    telNumber: '02 51 17 49 48',
    email: 'chateau@nantes.fr',
    website: 'https://www.chateaunantes.fr/fr',
    type: PlaceType.MUSEUM,
    price: 0,
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
      id: 1,
      street: 'Rue du Champ Louet',
      houseNumber: '1',
      zip: '44190',
      city: nantes,
      latitude: 47.097503,
      longitude: -1.27008,
      otherDetails: '',
    },
    telNumber: '02 51 17 49 48',
    email: 'hellfest@hellfest.fr',
    website: 'https://www.hellfest.fr',
    type: PlaceType.PUBLIC_PLACE,
    price: 105,
    tags: [PlaceTag.NOLOSAY, PlaceTag.DISABILITY_FRIENDLY, PlaceTag.DEAF_FRIENDLY, PlaceTag.BLIND_FRIENDLY],
  },
]

/**
 * @function getPlaces Get the places from the server.
 * @returns Promise of an array of places
 */
export default async function getPlaces({
  latitude,
  longitude,
  q,
  radius,
  token,
}: {
  latitude?: number
  longitude?: number
  q?: string
  radius?: number
  token: string
}): Promise<NoloPlacesJSON> {
  try {
    const queryParams: { [key: string]: string } = {}

    if (latitude !== undefined) {
      queryParams.latitude = latitude.toString()
    }
    if (longitude !== undefined) {
      queryParams.longitude = longitude.toString()
    }
    if (radius !== undefined) {
      queryParams.radius = radius.toString()
    }
    if (q !== undefined) {
      queryParams.q = q
    }

    const response = await get({
      endpoint: `/sites`,
      authorizationToken: token,
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    if (__DEV__ && responseData === 0) {
      return {
        json: PLACES,
        status: response.status,
        message: responseData.message,
      }
    }

    return {
      json: responseData,
      status: response.status,
      message: responseData.message,
    }
  } catch (error) {
    console.log("Error, couldn't get places:", error)
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

const PlacesToTranslate: ArtToTranslate[] = [
  {
    id: '1',
    uuid: '70e24df6-f8ee-594a-bb8f-de3666197fac',
    name: 'La joconde',
    picture: 'https://cdn.pariscityvision.com/library/image/5449.jpg',
    description:
      "La Joconde est un célèbre portrait de la Renaissance peint par Léonard de Vinci. Il représente une femme avec un léger sourire mystérieux, qui a captivé des générations de spectateurs. Le tableau est exposé au musée du Louvre à Paris, où il est l'une des œuvres les plus célèbres et les plus visitées.",
    RelatedPerson: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      picture: 'https://randomuser.me/api/portraits',
    },
    ItemType: {
      id: 1,
      name: "Œuvre d'art",
      ItemCategory: {
        id: 1,
        name: 'Musée',
      },
    },
  },
  {
    id: '2',
    uuid: '70e24df6-f8ee-594a-bb8f-de3666197fac',
    name: 'Nuit étoilée',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    description:
      'La Nuit étoilée est une célèbre peinture de Vincent van Gogh, réalisée en 1889. Elle représente un village endormi sous un ciel étoilé tourbillonnant. La peinture est emblématique du style unique de Van Gogh, avec ses coups de pinceau expressifs',
    RelatedPerson: {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      picture: 'https://randomuser.me/api/portraits',
    },
    ItemType: {
      id: 2,
      name: 'Centre culturel',
      ItemCategory: {
        id: 2,
        name: 'Lieu',
      },
    },
  },
  {
    id: '3',
    uuid: '70e24df6-f8ee-594a-bb8f-de3666197fac',
    name: 'Nighthawks',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1200px-Nighthawks_by_Edward_Hopper_1942.jpg',
    description:
      "Nighthawks est une célèbre peinture d'Edward Hopper, réalisée en 1942. Elle représente un café de nuit avec des clients solitaires assis à des tables. La peinture est emblématique du style réaliste de Hopper et de son utilisation de la lumière et de l'ombre pour créer une atmosphère intrigante.",
    RelatedPerson: {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      picture: 'https://randomuser.me/api/portraits',
    },
    ItemType: {
      id: 3,
      name: 'Jardin',
      ItemCategory: {
        id: 3,
        name: 'Lieu',
      },
    },
  },
]

export async function getPlacesNeedingDescription({ token }: { token: string }): Promise<PlacesNeedingTranslationJSON> {
  try {
    const response = await get({ endpoint: '/items/video-pending', authorizationToken: token })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const responseData = await response.json()

    if (responseData.length === 0 && __DEV__) {
      return {
        json: PlacesToTranslate,
        status: response.status,
        message: response.statusText,
      }
    }

    return {
      json: responseData,
      status: response.status,
      message: response.statusText,
    }
  } catch (err) {
    console.error(err)
    throw new Error(err instanceof Error ? err.message : String(err))
  }
}
