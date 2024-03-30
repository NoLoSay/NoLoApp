// eslint-disable-next-line no-shadow
export enum PlaceType {
  MUSEUM,
  LIBRARY,
  ARCHIVE,
  RESTAURANT,
  ATTRACTION,
  PUBLIC_PLACE,
  OTHER,
}

// eslint-disable-next-line no-shadow
export enum PlaceTag {
  NOLOSAY,
  DISABILITY_FRIENDLY,
  DEAF_FRIENDLY,
  BLIND_FRIENDLY,
  OTHER,
}

export interface Place {
  id: number
  name: string
  shortDescription: string
  longDescription: string
  image: string
  address: string
  phone: string
  email: string
  website: string
  coordinates: {
    latitude: number
    longitude: number
  }
  type: PlaceType
  price: number
  city: string
  country: string
  tags: PlaceTag[]
}

export type ArtToTranslate = {
  id: string
  uuid: string
  name: string
  description: string
  picture: string
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
