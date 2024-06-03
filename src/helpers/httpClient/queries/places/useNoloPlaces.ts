import { useMutation } from '@tanstack/react-query'
import { Place } from '@global/types/Places'
import { NoloPlacesJSON } from '@global/types/httpClient/queries/places'
import getPlaces from '@helpers/httpClient/places'

type UpdatePlacesDisplayedProps = {
  setPlaces: (places: Place[]) => void
  latitude?: number
  longitude?: number
  q?: string
  radius?: number
  token: string
}

export default function useNoloPlaces({
  setPlaces,
  latitude,
  longitude,
  q,
  radius,
  token,
}: UpdatePlacesDisplayedProps) {
  function updatePlacesDisplayed({ newPlaces }: { newPlaces: Place[] }) {
    setPlaces(newPlaces)
  }

  const mutation = useMutation<NoloPlacesJSON>({
    mutationFn: () => getPlaces({ latitude, longitude, q, radius, token }),
    onSuccess: data => {
      try {
        updatePlacesDisplayed({ newPlaces: data.json })
      } catch (error) {
        console.error(error)
      }
    },
  })

  return mutation
}
