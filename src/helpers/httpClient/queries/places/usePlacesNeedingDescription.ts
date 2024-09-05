import { useMutation } from '@tanstack/react-query'
import { ArtToTranslate } from '@global/types/Places'
import PlacesNeedingTranslationJSON from '@global/types/httpClient/queries/places'
import { getPlacesNeedingDescription } from '@helpers/httpClient/places'

type UpdatePlacesDisplayedProps = {
  setArtPieces: (artPieces: ArtToTranslate[]) => void
  displayErrorModal: (text: string) => void
  token: string
}

export default function usePlacesNeedingDescription({
  setArtPieces,
  displayErrorModal,
  token,
}: UpdatePlacesDisplayedProps) {
  function updatePlacesDisplayed({ newPlaces }: { newPlaces: ArtToTranslate[] }) {
    setArtPieces(newPlaces)
  }

  const mutation = useMutation<PlacesNeedingTranslationJSON>({
    mutationFn: () => getPlacesNeedingDescription({ token }),
    onSuccess: data => {
      try {
        updatePlacesDisplayed({ newPlaces: data.json })
      } catch (error) {
        // @ts-expect-error - error is a string
        displayErrorModal(error.message)
      }
    },
    onError: error => {
      console.error(error)
      displayErrorModal(error.message)
    },
  })

  return mutation
}
