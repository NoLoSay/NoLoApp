import { Place, PlaceNeedingTranslation } from '@global/types/Places'

export type PlacesNeedingTranslationJSON = {
  json: PlaceNeedingTranslation[]
  status: number
  message: string
}

export type NoloPlacesJSON = {
  json: Place[]
  status: number
  message: string
}

export default PlacesNeedingTranslationJSON
