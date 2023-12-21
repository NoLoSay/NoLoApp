/**
 * @fileoverview Controller of the PlaceArtsPiecesScreen screen
 * @module usePlaceArtsPiecesScreenController
 * @requires react react-native
 */

import { PlaceNeedingTranslation } from '../../../global/types/Places'

/**
 * @typedef {Object} usePlaceArtsPiecesScreenControllerType
 * @property {PlaceNeedingTranslation} place - Place needing description
 * @property {function} onCreatePress - Function to call when the create button is pressed
 * @property {function} doPlaceHaveOpenTranslation - Function to call to know if the place needs some translation(s)
 */
type usePlaceArtsPiecesScreenControllerType = {
  place: PlaceNeedingTranslation
  onCreatePress: (textToTranslate: string) => void
  doPlaceHaveOpenTranslation: () => boolean
}

/**
 * @typdef Props
 * @property {Object} navigation - Navigation object used to navigate between screens
 * @property {Object} route - Route object containing the params passed to the screen
 */
type Props = {
  navigation: any
  route: {
    params: {
      placeNeedingTranslation: PlaceNeedingTranslation
    }
  }
}

/**
 * @function usePlaceArtsPiecesScreenControllerController
 * @description Business logic of the PlaceArtsPiecesScreen screen
 * @param {Object} navigation - Navigation object used to navigate between screens
 * @param {Object} route - Route object containing the params passed to the screen
 * @return {usePlaceArtsPiecesScreenControllerType} - Object containing the business logic of the screen
 */
export default function usePlacesNeedingTranslationController({
  navigation,
  route,
}: Props): usePlaceArtsPiecesScreenControllerType {
  const place = route.params.placeNeedingTranslation

  /**
   * @function onCreatePress
   * @description Function to call when the create button is pressed
   * @param textToTranslate - Text to translate
   */
  const onCreatePress = (textToTranslate: string) => {
    navigation.popToTop()
    navigation.navigate('VideoScreen', {
      translateText: textToTranslate,
    })
  }

  /**
   * @function doPlaceHaveOpenTranslation
   * @description Function to call to know if the place needs some translation(s)
   * @returns boolean - Boolean indicating if the place needs some translation(s)
   */
  const doPlaceHaveOpenTranslation = () => place.artsToTranslate.length > 0

  return {
    place,
    onCreatePress,
    doPlaceHaveOpenTranslation,
  }
}
