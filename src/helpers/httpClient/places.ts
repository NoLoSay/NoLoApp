/**
 * @fileoverview Places helper functions.
 * @module Places
 * @description Helper functions to get and handle places.
 */

import PlacesNeedingTranslationJSON, { NoloPlacesJSON } from '@global/types/httpClient/queries/places'
import { ArtToTranslate } from '@global/types/Places'
import { get } from './common'

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

/**
 * @function getPlacesNeedingDescription Get the places that need a description.
 * @param props The user's token
 * @param props.token The user's token
 * @returns Promise of an array of places
 */
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
