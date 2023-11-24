import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'

const useVideoScreenController = () => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const frontCamera = useCameraDevice('front')
  const cameraRef = useRef<Camera>(null)
  const [isRecording, setIsRecording] = useState(false)

  const toggleRecording = () => setIsRecording(!isRecording)

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  const onRecordPress = async () => {
    if (!isRecording) {
      toggleRecording()
      cameraRef.current?.startRecording({
        onRecordingFinished: async video => {
          const { path } = video
          await CameraRoll.save(`file://${path}`, {
            type: 'video',
          })
            .then(() => console.log('success'))
            .catch(err => console.error(err))
        },
        onRecordingError: error => console.error(error),
      })
    }
    if (isRecording) {
      await cameraRef.current
        ?.stopRecording()
        .then(() => console.log('success'))
        .catch(err => console.error(err))
      toggleRecording()
    }
  }

  return {
    hasPermission,
    frontCamera,
    cameraRef,
    isRecording,
    onRecordPress,
  }
}

export default useVideoScreenController
