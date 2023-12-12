/**
 * @module useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @requires react
 */
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import images from '../../../../global/images'

/**
 * @typedef useOverlayModuleController
 * @description Type for the useOverlayModuleController custom hook.
 * @property {boolean} isAssistantVisible Is the assistant visible.
 * @property {function} toggleAssistant Toggle the assistant.
 */
type useOverlayModuleController = {
  isAssistantVisible: boolean
  onTimerPress: () => void
  isTimerModalVisible: boolean
  OVERLAY_OPTIONS: OverlayOption[]
  initialTimer: number
  setInitialTimer: (timer: number) => void
}

/**
 * @typedef Props
 * @description Type for the props of the useOverlayModuleController custom hook.
 * @property {number} timer The timer.
 */
type Props = {
  timer: number
}

/**
 * @typedef OverlayOption
 * @description Type for the OverlayOption object.
 * @property {string} title The title of the option.
 * @property {ImageSourcePropType} icon The icon of the option.
 * @property {function} onPress The function to call when the option is pressed.
 * @property {function} isActivated The function to call to check if the option is activated.
 */
type OverlayOption = {
  title: string
  icon: ImageSourcePropType
  onPress: () => void
  isActivated: () => boolean
}

/**
 * @function useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @returns {useOverlayModuleController} Variables that alters the OverlayModule.
 */
const useOverlayModuleController = ({ timer }: Props): useOverlayModuleController => {
  const [isAssistantVisible, setIsAssistantVisible] = useState(false)
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false)
  const [initialTimer, setInitialTimer] = useState(0)

  const toggleAssistant = () => setIsAssistantVisible(!isAssistantVisible)

  const toggleTimer = () => setIsTimerModalVisible(!isTimerModalVisible)

  useFocusEffect(
    useCallback(() => {
      setIsAssistantVisible(true)

      return () => {
        setIsTimerModalVisible(false)
      }
    }, [])
  )

  const OVERLAY_OPTIONS: OverlayOption[] = [
    {
      title: 'Assistant',
      icon: images.icons.outline.assistant(),
      onPress: toggleAssistant,
      isActivated: () => {
        return isAssistantVisible
      },
    },
    {
      title: 'Minuteur',
      icon: images.icons.outline.clock(),
      onPress: toggleTimer,
      isActivated: () => {
        return timer > 0
      },
    },
  ]

  return {
    isAssistantVisible,
    onTimerPress: toggleTimer,
    isTimerModalVisible,
    OVERLAY_OPTIONS,
    initialTimer,
    setInitialTimer,
  }
}

export default useOverlayModuleController
