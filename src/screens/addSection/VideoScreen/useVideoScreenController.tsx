/**
 * @fileoverview useVideoScreenController
 * @module useVideoScreenController
 * @description Returns the video screen controller, it contains all the logic related to the recording of videos on the app.
 * @requires CameraRoll @react-native-camera-roll/camera-roll
 * @requires useFocusEffect @react-navigation/native
 * @requires useCallback react
 * @requires useEffect react
 * @requires useRef react
 * @requires useState react
 * @requires DeviceInfo react-native-device-info
 * @requires Camera react-native-vision-camera
 * @requires CameraDevice react-native-vision-camera
 * @requires useCameraDevice react-native-vision-camera
 * @requires useCameraPermission react-native-vision-camera
 */

import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import DeviceInfo from 'react-native-device-info'
import { Camera, CameraDevice, VideoFile, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'

/**
 * @typedef VideoScreenController
 * @property {boolean} hasPermission Wether the user has granted the permission to use the camera or not
 * @property {CameraDevice} frontCamera The front camera device
 * @property {React.MutableRefObject<Camera | null>} cameraRef The camera ref
 * @property {boolean} isRecording Wether the camera is recording or not
 * @property {() => Promise<void>} onRecordPress Function that is called when the user presses the record button
 * @property {boolean} isLoading Wether the loading modal is visible or not
 * @property {boolean} isCameraActive Wether the camera is active or not
 * @property {boolean} isErrorModalVisible Wether the error modal is visible or not
 * @property {string} errorText The text to display in the error modal
 */
type VideoScreenController = {
  hasPermission: boolean
  frontCamera: CameraDevice | undefined
  cameraRef: React.MutableRefObject<Camera | null>
  isRecording: boolean
  onRecordPress: () => Promise<void>
  isLoading: boolean
  isCameraActive: boolean
  isErrorModalVisible: boolean
  errorText: string
  timer: number
  setTimer: React.Dispatch<React.SetStateAction<number>>
}

/**
 * @function useVideoScreenController
 * @description Returns the video screen controller, it contains all the logic related to the recording of videos on the app.
 * @returns videoScreenController object containing all the logic needed for the video screen
 */
const useVideoScreenController = (): VideoScreenController => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const frontCamera = useCameraDevice('front')
  const cameraRef = useRef<Camera>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [errorText, setErrorText] = useState("Vous n'avez pas autorisé l'accès à la galerie.")
  const [timer, setTimer] = useState(0)

  // TODO If user don't have authorized the access to camera roll, display error page

  /**
   * @function toggleRecording
   * @description Toggles the recording state
   */
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

  /**
   * @function displayErrorModal
   * @description Displays the error modal with the given text
   * @param {string} text The text to display in the error modal
   */
  const displayErrorModal = (text: string) => {
    setErrorText(text)
    setIsErrorModalVisible(true)
    setTimeout(() => setIsErrorModalVisible(false), 3000)
  }

  const recordIsFinished = async (video: VideoFile) => {
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
  }

  /**
   * @function onRecordPress
   * @description Function that is called when the user presses the record button, wether it starts or stops the recording
   */
  const onRecordPress = async () => {
    if (!isRecording) {
      toggleRecording()
      setTimeout(() => {
        cameraRef.current?.startRecording({
          onRecordingFinished: async video => {
            // eslint-disable-next-line eqeqeq -- Idk why but it doesn't work with ===
            if (timer == 0) recordIsFinished(video)
          },
          onRecordingError: error => {
            console.error(error)
            if (timer === 0) displayErrorModal("Une erreur est survenue lors de l'enregistrement de la vidéo")
          },
        })
      }, timer * 1000)
    }
    if (isRecording) {
      await cameraRef.current?.stopRecording().catch(err => {
        console.error(err)
        if (timer === 0) displayErrorModal("Une erreur est survenue lors de l'enregistrement de la vidéo")
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
    timer,
    setTimer,
  }
}

export default useVideoScreenController
