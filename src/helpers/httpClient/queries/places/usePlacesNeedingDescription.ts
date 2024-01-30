import { useMutation } from '@tanstack/react-query'
import { getPlacesNeedingDescription } from '../../places'
import { PlaceNeedingTranslation } from '../../../../global/types/Places'
import PlacesNeedingTranslationJSON from '../../../../global/types/httpClient/queries/places'

type UpdatePlacesDisplayedProps = {
  setPlaces: (places: PlaceNeedingTranslation[]) => void
  displayErrorModal: (text: string) => void
}

export default function usePlacesNeedingDescription({ setPlaces, displayErrorModal }: UpdatePlacesDisplayedProps) {
  function updatePlacesDisplayed({ newPlaces }: { newPlaces: PlaceNeedingTranslation[] }) {
    setPlaces(newPlaces)
  }

  const mutation = useMutation<PlacesNeedingTranslationJSON>({
    mutationFn: getPlacesNeedingDescription,
    onSuccess: data => {
      try {
        updatePlacesDisplayed({ newPlaces: data.json })
      } catch (error) {
        // @ts-expect-error - error is a string
        displayErrorModal(error.message)
      }
    },
    onError: error => {
      displayErrorModal(error.message)
    },
  })

  return mutation
}
