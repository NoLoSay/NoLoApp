// eslint-disable-next-line no-shadow
export enum PlaceType {
  MUSEUM = 'museum',
  RESTAURANT = 'restaurant',
  ATTRACTION = 'attraction',
  PUBLIC = 'public',
}

// eslint-disable-next-line no-shadow
export enum PlaceTag {
  NO_LOSAY = 'nolosay',
  DISABLED = 'disabled',
  DEAF = 'deaf',
  BLIND = 'blind',
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