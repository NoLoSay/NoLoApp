/**
 * @fileoverview Places type, used to define the response of the Places request.
 * @module Places
 * @description Typings for Places response.
 */

/**
 * @typedef {Object} PlaceType
 * @property {string} MUSEUM - The museum type.
 * @property {string} LIBRARY - The library type.
 * @property {string} ARCHIVE - The archive type.
 * @property {string} RESTAURANT - The restaurant type.
 * @property {string} ATTRACTION - The attraction type.
 * @property {string} PUBLIC_PLACE - The public place type.
 * @property {string} OTHER - The other type.
 */
// eslint-disable-next-line no-shadow
export enum PlaceType {
  MUSEUM = 'MUSEUM',
  LIBRARY = 'LIBRARY',
  ARCHIVE = 'ARCHIVE',
  RESTAURANT = 'RESTAURANT',
  ATTRACTION = 'ATTRACTION',
  PUBLIC_PLACE = 'PUBLIC_PLACE',
  OTHER = 'OTHER',
}

/**
 * @typedef {Object} PlaceTag
 * @property {string} NOLOSAY - The nolosay tag.
 * @property {string} DISABILITY_FRIENDLY - The disability friendly tag.
 * @property {string} DEAF_FRIENDLY - The deaf friendly tag.
 * @property {string} BLIND_FRIENDLY - The blind friendly tag.
 * @property {string} OTHER - The other tag.
 */
// eslint-disable-next-line no-shadow
export enum PlaceTag {
  NOLOSAY = 'NOLOSAY',
  DISABILITY_FRIENDLY = 'DISABILITY_FRIENDLY',
  DEAF_FRIENDLY = 'DEAF_FRIENDLY',
  BLIND_FRIENDLY = 'BLIND_FRIENDLY',
  OTHER = 'OTHER',
}

/**
 * @typedef {Object} Place
 * @property {number} id - The id of the place.
 * @property {string} name - The name of the place.
 * @property {string} shortDescription - The short description of the place.
 * @property {string} longDescription - The long description of the place.
 * @property {Object[]} pictures - The pictures of the place.
 * @property {number} pictures.id - The id of the picture.
 * @property {string} pictures.hostingUrl - The hosting url of the picture.
 * @property {Object} address - The address of the place.
 * @property {number} address.id - The id of the address.
 * @property {string} address.houseNumber - The house number of the address.
 * @property {string} address.street - The street of the address.
 * @property {string} address.zip - The zip of the address.
 * @property {Object} address.city - The city of the address.
 * @property {number} address.city.id - The id of the city.
 * @property {string} address.city.name - The name of the city.
 * @property {string} address.city.zip - The zip of the city.
 * @property {Object} address.city.department - The department of the city.
 * @property {number} address.city.department.id - The id of the department.
 * @property {string} address.city.department.name - The name of the department.
 * @property {Object} address.city.department.country - The country of the department.
 * @property {number} address.city.department.country.id - The id of the country.
 * @property {string} address.city.department.country.name - The name of the country.
 * @property {string} address.otherDetails - The other details of the address.
 * @property {number} address.latitude - The latitude of the address.
 * @property {number} address.longitude - The longitude of the address.
 * @property {string} telNumber - The telephone number of the place.
 * @property {string} email - The email of the place.
 * @property {string} website - The website of the place.
 * @property {PlaceType} type - The type of the place.
 * @property {number} price - The price of the place.
 * @property {PlaceTag[]} tags - The tags of the place.
 */
export interface Place {
  id: number
  name: string
  shortDescription: string
  longDescription: string
  pictures: {
    id: number
    hostingUrl: string
  }[]
  address: {
    id: number
    houseNumber: string
    street: string
    zip: string
    city: {
      id: number
      name: string
      zip: string
      department: {
        id: number
        name: string
        country: {
          id: number
          name: string
        }
      }
    }
    otherDetails: string
    latitude: number
    longitude: number
  }
  telNumber: string
  email: string
  website: string
  type: PlaceType
  price: number
  tags: PlaceTag[]
}

/**
 * @typedef {Object} ArtToTranslate
 * @property {string} id - The id of the art to translate.
 * @property {string} uuid - The uuid of the art to translate.
 * @property {string} name - The name of the art to translate.
 * @property {string} description - The description of the art to translate.
 * @property {string} picture - The picture of the art to translate.
 * @property {Object} RelatedPerson - The related person of the art to translate.
 * @property {Object} ItemType - The type of the item.
 * @property {number} ItemType.id - The id of the item type.
 * @property {string} ItemType.name - The name of the item type.
 * @property {Object} ItemType.ItemCategory - The category of the item type.
 * @property {number} ItemType.ItemCategory.id - The id of the item category.
 * @property {string} ItemType.ItemCategory.name - The name of the item category.
 * @description Art to translate.
 */
export type ArtToTranslate = {
  id: string
  uuid: string
  name: string
  description: string
  picture: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RelatedPerson: any
  ItemType: {
    id: number
    name: string
    ItemCategory: {
      id: number
      name: string
    }
  }
}

/**
 * @typedef {Object} PlaceNeedingTranslation
 * @property {string} id - The id of the place needing translation.
 * @property {string} name - The name of the place needing translation.
 * @property {string} smallImage - The small image of the place needing translation.
 * @property {string} bigImage - The big image of the place needing translation.
 * @property {ArtToTranslate[]} artsToTranslate - The arts to translate of the place needing translation.
 */
export type PlaceNeedingTranslation = {
  id: string
  name: string
  smallImage: string
  bigImage: string
  artsToTranslate: ArtToTranslate[]
}
