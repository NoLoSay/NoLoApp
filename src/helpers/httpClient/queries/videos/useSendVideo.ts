import { sendTranslationVideo } from '@helpers/httpClient/videos'
import { useMutation } from '@tanstack/react-query'
import { Alert } from 'react-native'

type SendVideoProps = {
  token: string
  navigation: any
}

type MutationParams = {
  variables: {
    artworkId: string
    filename: string
    uri: string
  }
}

export default function useSendVideo({ token, navigation }: SendVideoProps) {
  const mutation = useMutation<number, unknown, MutationParams>({
    mutationFn: ({ variables }: MutationParams) =>
      sendTranslationVideo({
        artworkId: variables.artworkId,
        token,
        filename: variables.filename,
        uri: variables.uri,
      }),
    onSuccess: data => {
      if (data % 100 < 100) {
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
