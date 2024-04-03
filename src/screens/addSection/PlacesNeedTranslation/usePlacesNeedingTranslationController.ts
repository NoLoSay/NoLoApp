/**
 * @fileoverview Controller of the PlacesNeedingTranslation screen
 * @module usePlacesNeedingTranslationController
 * @requires react react-native
 */
import { useContext, useEffect, useState } from 'react'
import { ArtToTranslate } from '@global/types/Places'
import usePlacesNeedingDescription from '@helpers/httpClient/queries/places/usePlacesNeedingDescription'
import { AccountContext } from '@global/contexts/AccountProvider'

/**
 * @typedef {Object} usePlacesNeedingTranslationControllerType
 * @property {function} onCreatePress - Function to call when the user wants to create a video
 * @property {function} onTextPress - Function to call when the user wants to see the text to translate
 * @property {ArtToTranslate[]} artPieces - List of artPieces needing translation
 * @property {boolean} displayError - Boolean indicating if an error modal should be displayed
 * @property {string} errorText - Text to display in the error modal
 */
type usePlacesNeedingTranslationControllerType = {
  onCreatePress: (textToTranslate: string) => void
  onTextPress: (textToTranslate: string, artName: string) => void
  artPieces: ArtToTranslate[]
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
  const [artPieces, setArtPieces] = useState<ArtToTranslate[]>([])
  const { account } = useContext(AccountContext)
  const [displayError, setDisplayError] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const placesNeedingTranslationMutation = usePlacesNeedingDescription({
    setArtPieces,
    displayErrorModal,
    token: account.accessToken,
  })

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
   * @function onTextPress
   * @description Function to call when the text is pressed
   * @param textToTranslate - Text to translate
   * @param artName - Name of the art work
   */
  const onTextPress = (textToTranslate: string, artName: string) => {
    navigation.navigate('TextScreen', {
      textToTranslate,
      artName,
    })
  }

  return {
    onCreatePress,
    onTextPress,
    artPieces,
    displayError,
    errorText,
  }
}
