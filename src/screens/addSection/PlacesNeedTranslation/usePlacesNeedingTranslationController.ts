/**
 * @fileoverview Controller of the PlacesNeedingTranslation screen
 * @module usePlacesNeedingTranslationController
 * @requires react react-native
 */
import { useCallback, useContext, useState } from 'react'
import { ArtToTranslate } from '@global/types/Places'
import usePlacesNeedingDescription from '@helpers/httpClient/queries/places/usePlacesNeedingDescription'
import { AccountContext } from '@global/contexts/AccountProvider'
import { launchImageLibrary } from 'react-native-image-picker'
import { Alert, Linking } from 'react-native'
import useSendVideo from '@helpers/httpClient/queries/videos/useSendVideo'
import { AccountElevationEnum } from '@global/types/Account'
import { useFocusEffect } from '@react-navigation/native'

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
  onSendPress: (id: string) => void
  artPieces: ArtToTranslate[]
  displayError: boolean
  errorText: string
  isModerator: boolean
}

/**
 * @typdef Props
 * @property {Object} navigation - Navigation object used to navigate between screens
 */
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const sendVideoMutation = useSendVideo({
    token: account.accessToken,
    navigation,
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

  useFocusEffect(
    useCallback(() => {
      if (account.elevation !== AccountElevationEnum.CREATOR) {
        setArtPieces([])
        Alert.alert(
          'Erreur de permission',
          "Vous avez besoin d'un compte créateur pour accéder à cette fonctionnalité",
          [
            {
              text: 'Annuler',
              style: 'cancel',
              onPress: () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                navigation.goBack()
              },
            },
            {
              text: 'Changer son profil pour créateur',
              onPress: () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                navigation.navigate('Home')
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                navigation.navigate('SettingsModal')
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                navigation.navigate('AccountModification')
              },
            },
          ]
        )
      } else if (account.elevation === AccountElevationEnum.CREATOR) {
        placesNeedingTranslationMutation.mutate()
      }

      return () => {}
    }, [account.elevation])
  )

  /**
   * @function onCreatePress
   * @description Function to call when the create button is pressed
   * @param textToTranslate - Text to translate
   */
  const onCreatePress = (textToTranslate: string) => {
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

  /**
   * @function displayAlert
   * @param libraryAlert - Boolean indicating if the alert should be displayed
   */
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
    }
  }

  /**
   * @function onSendPress
   * @description Function to call when the send button is pressed
   * @param id - Id of the art piece
   */
  const onSendPress = async (id: string) => {
    const res = await launchImageLibrary({
      mediaType: 'video',
    })

    if (res.didCancel) {
      return
    }

    displayAlert(res.errorCode === 'permission')

    if (res.assets !== undefined && res.assets[0].uri && res.assets[0].fileName) {
      sendVideoMutation.mutate({
        variables: { artworkId: id, filename: res.assets[0].fileName, uri: res.assets[0].uri },
      })
    }
  }

  return {
    onCreatePress,
    onTextPress,
    onSendPress,
    artPieces,
    displayError,
    errorText,
    isModerator: account.elevation === AccountElevationEnum.MODERATOR,
  }
}
