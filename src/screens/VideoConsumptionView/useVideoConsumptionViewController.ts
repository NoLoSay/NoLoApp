import { AccountContext } from '@global/contexts/AccountProvider'
import useGetVideoInformation from '@helpers/httpClient/queries/videos/useGetVideoInformation'
import { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

type useVideoConsumptionViewControllerProps = {
  route: {
    params: {
      itemId: string
    }
  }
}

type useVideoConsumptionViewController = {
  videoId: string
  title: string
  videoWidth: number
  videoHeight: number
  videoText: string
  error: string
}

export default function useVideoConsumptionViewController({
  route,
}: useVideoConsumptionViewControllerProps): useVideoConsumptionViewController {
  const { itemId } = route.params
  const { width, height } = Dimensions.get('window')
  const { account } = useContext(AccountContext)
  const [finalVideoId, setFinalVideoId] = useState(itemId)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const getVideoMutation = useGetVideoInformation({
    itemId,
    setError,
    token: account.accessToken,
    setFinalVideoId,
    setTitle,
    setDescription,
  })

  useEffect(() => {
    getVideoMutation.mutate()
  }, [])

  return {
    videoId: finalVideoId,
    title,
    videoWidth: width,
    videoHeight: (height / 100) * 60,
    videoText: description,
    error,
  }
}
