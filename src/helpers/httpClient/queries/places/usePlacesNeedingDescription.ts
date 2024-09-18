/**
 * @fileoverview API for places needing description mutation.
 * @module usePlacesNeedingDescription Handles the places needing description mutation
 */

import { useMutation } from '@tanstack/react-query'
import { ArtToTranslate } from '@global/types/Places'
import PlacesNeedingTranslationJSON from '@global/types/httpClient/queries/places'
import { getPlacesNeedingDescription } from '@helpers/httpClient/places'

type UpdatePlacesDisplayedProps = {
  setArtPieces: (artPieces: ArtToTranslate[]) => void
  displayErrorModal: (text: string) => void
  token: string
}

/**
 * @function usePlacesNeedingDescription Handles the places needing description mutation
 * @param props The setArtPieces function, and the token
 * @param props.setArtPieces The function to set the art pieces
 * @param props.displayErrorModal The function to display the error modal
 * @param props.token The token
 * @returns The mutation object
 */
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
