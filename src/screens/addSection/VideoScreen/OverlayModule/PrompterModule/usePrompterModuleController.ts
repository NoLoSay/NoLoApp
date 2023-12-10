/**
 * @module useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @requires react
 */
import { Dispatch, RefObject, useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'

type useOverlayModuleController = {
  svRef: RefObject<ScrollView>
  speed: number
  setSpeed: Dispatch<React.SetStateAction<number>>
  size: number
  setSize: Dispatch<React.SetStateAction<number>>
}

type Props = {
  isRecording: boolean
  timer: number
}

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
