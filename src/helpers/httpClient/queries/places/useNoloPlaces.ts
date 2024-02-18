import { useMutation } from '@tanstack/react-query'
import { Place } from '@global/types/Places'
import { NoloPlacesJSON } from '@global/types/httpClient/queries/places'
import getPlaces from '@helpers/httpClient/places'

type UpdatePlacesDisplayedProps = {
  setPlaces: (places: Place[]) => void
  displayErrorModal: (text: string) => void
  latitude: number
  longitude: number
  q: string
  radius: number
}

export default function useNoloPlaces({
  setPlaces,
  displayErrorModal,
  latitude,
  longitude,
  q,
  radius,
}: UpdatePlacesDisplayedProps) {
  function updatePlacesDisplayed({ newPlaces }: { newPlaces: Place[] }) {
    setPlaces(newPlaces)
  }

  const mutation = useMutation<NoloPlacesJSON>({
    mutationFn: () => getPlaces({ latitude, longitude, q, radius }),
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
