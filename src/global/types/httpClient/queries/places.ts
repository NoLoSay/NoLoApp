import { ArtToTranslate, Place } from '@global/types/Places'

export type PlacesNeedingTranslationJSON = {
  json: ArtToTranslate[]
  status: number
  message: string
}

export type NoloPlacesJSON = {
  json: Place[]
  status: number
  message: string
}

export default PlacesNeedingTranslationJSON
