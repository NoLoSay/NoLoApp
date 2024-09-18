/**
 * @fileoverview useUserVideo handles the user video mutation
 * @module useUserVideo
 * @requires @tanstack/react-query
 */
import { useMutation } from '@tanstack/react-query'
import getUserVideos from '@helpers/httpClient/videos'
import VideosJSON, { VideoLibrary } from '@global/types/httpClient/queries/videos'

type UpdatePlacesDisplayedProps = {
  userId: number
  setVideos: (places: VideoLibrary[]) => void
  setError: (text: string) => void
  token: string
}

/**
 * @function useUserVideo Handles the user video mutation
 * @param props The user id, setVideos, setError, and token
 * @param props.userId The user id
 * @param props.setVideos The function to set the videos
 * @param props.setError The function to set the error
 * @param props.token The token
 * @returns The mutation object
 */
export default function useUserVideo({ setVideos, userId, setError, token }: UpdatePlacesDisplayedProps) {
  function updatePlacesDisplayed({ userVideos }: { userVideos: VideoLibrary[] }) {
    setVideos(userVideos)
  }

  const mutation = useMutation<VideosJSON>({
    mutationFn: () => getUserVideos({ userId, token }),
    onSuccess: data => {
      try {
        updatePlacesDisplayed({ userVideos: data.json })
      } catch (error) {
        // @ts-expect-error - error is a string
        setError(error.message)
      }
    },
    onError: error => {
      setError(error.message)
    },
  })

  return mutation
}
