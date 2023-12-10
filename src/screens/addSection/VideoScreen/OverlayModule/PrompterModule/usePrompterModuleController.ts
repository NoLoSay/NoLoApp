/**
 * @module useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @requires react
 */
import { Dispatch, RefObject, useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'

/**
 * @typedef useOverlayModuleController
 * @description Return of the useOverlayModuleController.
 * @property {RefObject<ScrollView>} svRef The reference to the ScrollView.
 * @property {number} speed The speed of the prompter.
 * @property {function} setSpeed Set the speed of the prompter.
 * @property {number} size The size of the prompter.
 * @property {function} setSize Set the size of the prompter.
 */
type useOverlayModuleController = {
  svRef: RefObject<ScrollView>
  speed: number
  setSpeed: Dispatch<React.SetStateAction<number>>
  size: number
  setSize: Dispatch<React.SetStateAction<number>>
}

/**
 * @typedef Props
 * @description Type for the props of the useOverlayModuleController custom hook.
 * @property {boolean} isRecording Is the video recording.
 * @property {number} timer The timer value.
 */
type Props = {
  isRecording: boolean
  timer: number
}

/**
 * @function useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @param {isRecording} boolean Is the video recording.
 * @param {timer} number The timer value.
 * @returns {useOverlayModuleController} Variables that alters the OverlayModule.
 */
const useOverlayModuleController = ({ isRecording, timer }: Props): useOverlayModuleController => {
  const [yPosition, setYPosition] = useState(0)
  const [speed, setSpeed] = useState<number>(10)
  const [size, setSize] = useState<number>(36)
  const svRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (!isRecording) {
      setYPosition(0)
      svRef.current?.scrollTo({ y: 0, animated: true })
    }
    if (isRecording && timer <= 0) {
      setTimeout(() => {
        const newPos = yPosition + speed
        setYPosition(newPos)
        svRef.current?.scrollTo({ y: newPos, animated: true })
      }, 250)
    }
  }, [isRecording, yPosition, speed, timer])

  return {
    svRef,
    speed,
    setSpeed,
    size,
    setSize,
  }
}

export default useOverlayModuleController
