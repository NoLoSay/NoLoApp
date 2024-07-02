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
  picture: string
  address: {
    street: string
    number: string
    postalCode: string
    city: string
    country: string
    latitude: number
    longitude: number
  }
  phone: string
  email: string
  website: string
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
