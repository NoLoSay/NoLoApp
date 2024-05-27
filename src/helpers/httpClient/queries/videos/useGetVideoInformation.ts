import { useMutation } from '@tanstack/react-query'
import { getItemVideo } from '@helpers/httpClient/videos'
import { ItemVideosJSON } from '@global/types/httpClient/queries/videos'

type GetVideoInformationProps = {
  itemId: string
  setError: (text: string) => void
  token: string
  setFinalVideoId: (videoId: string) => void
  setDescription: (description: string) => void
  setTitle: (title: string) => void
}

export default function useGetVideoInformation({
  itemId,
  setError,
  token,
  setFinalVideoId,
  setDescription,
  setTitle,
}: GetVideoInformationProps) {
  const mutation = useMutation<ItemVideosJSON>({
    mutationFn: () => getItemVideo({ itemId, token }),
    onSuccess: ({ json }) => {
      try {
        setTitle(json.name)
        setDescription(json.description)

        json.videos.some(video => {
          if (video.hostingProviderId === 2) {
            setFinalVideoId(video.hostingProviderVideoId)
            return true
          }
          return false
        })
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
