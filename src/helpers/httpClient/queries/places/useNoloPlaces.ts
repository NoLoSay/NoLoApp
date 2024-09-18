/**
 * @fileoverview useNoloPlaces hook, used to fetch places from the Nolo API.
 * @module useNoloPlaces
 * @requires react-query
 */
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

/**
 * @function useNoloPlaces Handles the places mutation
 * @param props The setPlaces function, latitude, longitude, q, radius, and token
 * @param props.setPlaces The function to set the places
 * @param props.latitude The latitude
 * @param props.longitude The longitude
 * @param props.q The query
 * @param props.radius The radius
 * @param props.token The token
 * @returns The mutation object
 */
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
