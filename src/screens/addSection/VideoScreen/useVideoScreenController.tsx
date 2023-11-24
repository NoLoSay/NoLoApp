import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import DeviceInfo from 'react-native-device-info'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'

const useVideoScreenController = () => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const frontCamera = useCameraDevice('front')
  const cameraRef = useRef<Camera>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleRecording = () => setIsRecording(!isRecording)

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  // React-navigation hook allowing us to know when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setIsCameraActive(true)

      return () => {
        setIsCameraActive(false)
      }
    }, [])
  )

  const onRecordPress = async () => {
    if (!isRecording) {
      toggleRecording()
      cameraRef.current?.startRecording({
        onRecordingFinished: async video => {
          setIsLoading(true)
          const { path } = video
          await CameraRoll.save(`file://${path}`, {
            type: 'video',
            album: DeviceInfo.getApplicationName(),
          })
            .then(() => console.log('success')) // TODO Redirect to ? See with team
            .catch(err => console.error(err)) // TODO Afficher un message d'erreur
          setIsLoading(false)
        },
        onRecordingError: error => console.error(error), // TODO Afficher un message d'erreur
      })
    }
    if (isRecording) {
      await cameraRef.current?.stopRecording().catch(err => console.error(err)) // TODO Afficher un message d'erreur
      toggleRecording()
    }
  }

  return {
    hasPermission,
    frontCamera,
    cameraRef,
    isRecording,
    onRecordPress,
    isLoading,
    isCameraActive,
  }
}

export default useVideoScreenController
