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
 * @property {number} timerValue The current timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setTimerValue Function that sets the timer value
 * @property {number} defaultTimerValue The default timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setDefaultTimerValue Function that sets the default timer value
 * @property {number} endTimerValue The end timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setEndTimerValue Function that sets the end timer value
 * @property {number} defaultEndTimerValue The default end timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setDefaultEndTimerValue Function that sets the default end timer value
 * @property {boolean} isTimerModalVisible Wether the timer modal is visible or not
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsTimerModalVisible Function that sets the visibility of the timer modal
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
  timerValue: number
  setTimerValue: React.Dispatch<React.SetStateAction<number>>
  defaultTimerValue: number
  setDefaultTimerValue: React.Dispatch<React.SetStateAction<number>>
  endTimerValue: number
  setEndTimerValue: React.Dispatch<React.SetStateAction<number>>
  defaultEndTimerValue: number
  setDefaultEndTimerValue: React.Dispatch<React.SetStateAction<number>>
  isTimerModalVisible: boolean
  setIsTimerModalVisible: React.Dispatch<React.SetStateAction<boolean>>
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
  const [timerValue, setTimerValue] = useState(0)
  const [defaultTimerValue, setDefaultTimerValue] = useState(0)
  const [endTimerValue, setEndTimerValue] = useState(0)
  const [defaultEndTimerValue, setDefaultEndTimerValue] = useState(0)
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false)

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

  /**
   * @function recordIsFinished
   * @description Function that is called when the recording is finished, it saves the video to the camera roll
   * @param {VideoFile} video The video file
   * @returns {Promise<void>} Promise that resolves when the video is saved to the camera roll
   */
  const recordIsFinished = async (video: VideoFile) => {
    setIsLoading(true)
    const { path } = video
    await CameraRoll.saveAsset(`file://${path}`, {
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
   * @function startRecording
   * @description Starts the recording of the video and handles events related to the recording
   * @returns {Promise<void>} Promise that resolves when the recording is finished
   */
  const startRecording = async () => {
    cameraRef.current?.startRecording({
      onRecordingFinished: async video => {
        // eslint-disable-next-line eqeqeq -- Idk why but it doesn't work with ===
        recordIsFinished(video)
      },
      onRecordingError: error => {
        console.error(error)
        displayErrorModal("Une erreur est survenue lors de l'enregistrement de la vidéo")
      },
    })
  }

  /**
   * @function stopRecording
   * @description Stops the recording of the video and handles errors
   * @returns {Promise<void>} Promise that resolves when the recording is stopped
   */
  const stopRecording = async () => {
    cameraRef.current?.stopRecording().catch(err => {
      console.error(err)
      displayErrorModal("Une erreur est survenue lors de l'enregistrement de la vidéo")
    })
  }

  /**
   * @function onRecordPress
   * @description Function that is called when the user presses the record button, wether it starts or stops the recording
   */
  const onRecordPress = async () => {
    toggleRecording()
  }

  /**
   * @function useEffect
   * @description Starts the recording when the timer value is 0
   */
  useEffect(() => {
    if (timerValue === 0) {
      startRecording()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect when timerValue changes
  }, [timerValue])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isRecording) {
      if (timerValue <= 0 && !isTimerModalVisible) {
        stopRecording()
      }
      setTimerValue(defaultTimerValue)
    } else {
      // eslint-disable-next-line eqeqeq -- Idk why but it doesn't work with ===
      if (defaultTimerValue == 0) {
        startRecording()
        return
      }
      const countdown = setInterval(() => {
        setTimerValue(prev => prev - 1)
      }, 1000)

      // eslint-disable-next-line consistent-return
      return () => {
        clearInterval(countdown)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect when isRecording changes
  }, [isRecording, timerValue])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isRecording) {
      if (endTimerValue === 0 && defaultEndTimerValue !== 0) {
        toggleRecording()
      }

      if (timerValue <= 0) {
        const countdown = setInterval(() => {
          setEndTimerValue(prev => prev - 1)
        }, 1000)

        // eslint-disable-next-line consistent-return
        return () => {
          clearInterval(countdown)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect when endTimerValue changes
  }, [isRecording, endTimerValue, timerValue])

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
    timerValue,
    setTimerValue,
    defaultTimerValue,
    setDefaultTimerValue,
    endTimerValue,
    setEndTimerValue,
    defaultEndTimerValue,
    setDefaultEndTimerValue,
    isTimerModalVisible,
    setIsTimerModalVisible,
  }
}

export default useVideoScreenController
