/**
 * @fileoverview Send video hook
 * @module useSendVideo
 * @requires @tanstack/react-query
 * @requires react-native
 */

import { sendTranslationVideo } from '@helpers/httpClient/videos'
import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'

type SendVideoProps = {
  token: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

type MutationParams = {
  variables: {
    artworkId: string
    filename: string
    uri: string
  }
}

/**
 * @function useSendVideo Handles the send video mutation
 * @param props The token and navigation object
 * @param props.token The token
 * @param props.navigation The navigation object
 * @returns The mutation object
 */
export default function useSendVideo({ token, navigation }: SendVideoProps) {
  const mutation = useMutation<boolean, unknown, MutationParams>({
    mutationFn: ({ variables }: MutationParams) =>
      sendTranslationVideo({
        artworkId: variables.artworkId,
        token,
        filename: variables.filename,
        uri: variables.uri,
      }),
    onSuccess: data => {
      if (data) {
        Alert.alert('Succès', 'La vidéo a bien été envoyée', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack()
              navigation.navigate('Add')
            },
          },
        ])
      } else {
        Alert.alert('Erreur', "La vidéo n'a pas pu être envoyée, veuillez réessayer ultérieurement")
      }
    },
    onError: error => {
      console.log(error)
    },
  })

  return mutation
}
