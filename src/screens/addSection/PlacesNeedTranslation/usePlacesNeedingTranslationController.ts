/**
 * @fileoverview Controller of the PlacesNeedingTranslation screen
 * @module usePlacesNeedingTranslationController
 * @requires react react-native
 */
import { useContext, useEffect, useState } from 'react'
import { ArtToTranslate } from '@global/types/Places'
import usePlacesNeedingDescription from '@helpers/httpClient/queries/places/usePlacesNeedingDescription'
import { AccountContext } from '@global/contexts/AccountProvider'
import { launchImageLibrary } from 'react-native-image-picker'
import { Alert, Linking } from 'react-native'

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
  onSendPress: () => void
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

  const displayAlert = (libraryAlert: boolean) => {
    if (libraryAlert) {
      Alert.alert(
        'Erreur de permission',
        "Vous devez autoriser l'accès à votre bibliothèque pour sélectionner une vidéo",
        [
          {
            text: 'Autoriser',
            onPress: () => {
              Linking.openSettings()
            },
          },
          {
            text: 'Annuler',
            style: 'cancel',
          },
        ]
      )
    } else if (!libraryAlert) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la sélection de la vidéo')
    }
  }

  const onSendPress = async () => {
    const res = await launchImageLibrary({
      mediaType: 'video',
    })

    if (res.didCancel) {
      return
    }

    displayAlert(res.errorCode === 'permission')

    if (res.assets !== undefined) {
      console.log(res.assets[0].uri)
      const res2 = await fetch('http://localhost:3002/upload/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${account.accessToken}`,
        },
        body: JSON.stringify({
          file: res.assets[0].uri,
        }),
      })

      if (res2.ok) {
        Alert.alert('Succès', 'La vidéo a bien été envoyée')
      } else {
        Alert.alert('Erreur', "Une erreur est survenue lors de l'envoi de la vidéo")
        console.log(res2.text().then(text => console.log(text)))
      }
    }
  }

  return {
    onCreatePress,
    onTextPress,
    onSendPress,
    artPieces,
    displayError,
    errorText,
  }
}
