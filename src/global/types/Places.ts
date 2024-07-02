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

// eslint-disable-next-line no-shadow
export enum PlaceTag {
  NOLOSAY = 'NOLOSAY',
  DISABILITY_FRIENDLY = 'DISABILITY_FRIENDLY',
  DEAF_FRIENDLY = 'DEAF_FRIENDLY',
  BLIND_FRIENDLY = 'BLIND_FRIENDLY',
  OTHER = 'OTHER',
}

export interface Place {
  id: number
  name: string
  shortDescription: string
  longDescription: string
  picture: string
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

export type PlaceNeedingTranslation = {
  id: string
  name: string
  smallImage: string
  bigImage: string
  artsToTranslate: ArtToTranslate[]
}
