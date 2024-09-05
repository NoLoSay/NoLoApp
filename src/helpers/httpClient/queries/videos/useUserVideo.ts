import { useMutation } from '@tanstack/react-query'
import getUserVideos from '@helpers/httpClient/videos'
import VideosJSON, { VideoLibrary } from '@global/types/httpClient/queries/videos'

type UpdatePlacesDisplayedProps = {
  userId: number
  setVideos: (places: VideoLibrary[]) => void
  setError: (text: string) => void
  token: string
}

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
