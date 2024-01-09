import { Dimensions } from 'react-native'

type useVideoConsumptionViewControllerProps = {
  route: {
    params: {
      videoId: string
      title: string
      videoText: string
    }
  }
}

type useVideoConsumptionViewController = {
  videoId: string
  title: string
  videoWidth: number
  videoHeight: number
  videoText: string
}

export default function useVideoConsumptionViewController({
  route,
}: useVideoConsumptionViewControllerProps): useVideoConsumptionViewController {
  const { videoId, title, videoText } = route.params
  const { width, height } = Dimensions.get('window')
  return {
    videoId,
    title,
    videoWidth: width,
    videoHeight: (height / 100) * 60,
    videoText,
  }
}
