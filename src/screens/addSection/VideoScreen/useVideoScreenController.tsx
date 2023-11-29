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
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [errorText, setErrorText] = useState("Vous n'avez pas autorisé l'accès à la galerie.")

  // TODO If user don't have authorized the access to camera roll, display error page

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

  const displayErrorModal = (text: string) => {
    setErrorText(text)
    setIsErrorModalVisible(true)
    setTimeout(() => setIsErrorModalVisible(false), 3000)
  }

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
            .catch(err => {
              console.error(err.message)
              if (err.message === 'Access to photo library was denied')
                displayErrorModal("Vous n'avez pas autorisé l'accès à la galerie.")
              else displayErrorModal("Une erreur est survenue lors de l'enregistrement de la vidéo")
            })
          setIsLoading(false)
        },
        onRecordingError: error => {
          console.error(error)
          displayErrorModal("Une erreur est survenue lors de l'enregistrement de la vidéo")
        },
      })
    }
    if (isRecording) {
      await cameraRef.current?.stopRecording().catch(err => {
        console.error(err)
        displayErrorModal("Une erreur est survenue lors de l'enregistrement de la vidéo")
      })
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
    isErrorModalVisible,
    errorText,
  }
}

export default useVideoScreenController
