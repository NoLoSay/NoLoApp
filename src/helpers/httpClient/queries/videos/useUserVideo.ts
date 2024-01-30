import { useMutation } from '@tanstack/react-query'
import getUserVideos from '@helpers/httpClient/videos'
import { Video } from '@global/types/Videos'
import VideosJSON from '@global/types/httpClient/queries/videos'

type UpdatePlacesDisplayedProps = {
  userId: number
  setVideos: (places: Video[]) => void
  setError: (text: string) => void
}

export default function useUserVideo({ setVideos, userId, setError }: UpdatePlacesDisplayedProps) {
  function updatePlacesDisplayed({ userVideos }: { userVideos: Video[] }) {
    setVideos(userVideos)
  }

  const mutation = useMutation<VideosJSON>({
    mutationFn: () => getUserVideos({ userId }),
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
