/**
 * @fileoverview Controller of the PlacesNeedingTranslation screen
 * @module usePlacesNeedingTranslationController
 * @requires react react-native
 */
import { useEffect, useState } from 'react'
import { PlaceNeedingTranslation } from '../../../global/types/Places'
import { getPlacesNeedingDescription } from '../../../helpers/httpClient/places'
import usePlacesNeedingDescription from '../../../helpers/httpClient/queries/places/usePlacesNeedingDescription'

/**
 * @typedef {Object} onPlacePressParams
 * @property {ArtToTranslate[]} artsToTranslate
 * @property {string} placeName
 */
type onPlacePressParams = {
  place: PlaceNeedingTranslation
}

/**
 * @typedef {Object} usePlacesNeedingTranslationControllerType
 * @property {function} onPlacePress - Function to call when a place is pressed
 * @property {PlaceNeedingTranslation[]} places - List of places needing translation
 * @property {boolean} isLoading - Boolean indicating if the places are being fetched
 * @property {boolean} displayError - Boolean indicating if an error modal should be displayed
 * @property {string} errorText - Text to display in the error modal
 */
type usePlacesNeedingTranslationControllerType = {
  onPlacePress: ({ place }: onPlacePressParams) => void
  places: PlaceNeedingTranslation[]
  isLoading: boolean
  displayError: boolean
  errorText: string
}

/**
 * @typdef Props
 * @property {Object} navigation - Navigation object used to navigate between screens
 */
type Props = {
  navigation: any
}

/**
 * @function usePlacesNeedingTranslationController
 * @description Business logic of the PlacesNeedingTranslation screen
 * @param {Object} navigation - Navigation object used to navigate between screens
 * @return {usePlacesNeedingTranslationControllerType} - Object containing the business logic of the screen
 */
export default function usePlacesNeedingTranslationController({
  navigation,
}: Props): usePlacesNeedingTranslationControllerType {
  const [places, setPlaces] = useState<PlaceNeedingTranslation[]>([])
  const [displayError, setDisplayError] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const placesNeedingTranslationMutation = usePlacesNeedingDescription({ setPlaces, displayErrorModal })

  /**
   * @function displayErrorModal
   * @description Display an error modal with the given text for 3 seconds and then go back to the previous screen
   * @param text - Text to display in the error modal
   */
  function displayErrorModal(text: string) {
    setErrorText(text)
    setDisplayError(true)
  }

  useEffect(() => {
    placesNeedingTranslationMutation.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPlacePress = ({ place }: onPlacePressParams) => {
    navigation.navigate('PlaceArtsPiecesScreen', { placeNeedingTranslation: place })
  }

  return {
    onPlacePress,
    places,
    isLoading: placesNeedingTranslationMutation.isPending,
    displayError,
    errorText,
  }
}
