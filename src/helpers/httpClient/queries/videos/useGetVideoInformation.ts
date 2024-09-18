/**
 * @fileoverview useGetVideoInformation is a custom react query hook that fetches the video information of an item
 * @module useGetVideoInformation
 * @requires @tanstack/react-query
 */
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

/**
 * @function useGetVideoInformation Handles the video information mutation
 * @param props The item id, error, token, setFinalVideoId, setDescription, and setTitle functions
 * @param props.itemId The item id
 * @param props.setError The function to set the error
 * @param props.token The token
 * @param props.setFinalVideoId The function to set the final video id
 * @param props.setDescription The function to set the description
 * @param props.setTitle The function to set the title
 * @returns The mutation object
 */
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
