/**
 * @module useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @requires react
 */
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import images from '@global/images'

/**
 * @typedef useOverlayModuleController
 * @description Type for the useOverlayModuleController custom hook.
 * @property {boolean} isAssistantVisible Is the assistant visible.
 * @property {function} onTimerPress Handle the timer press
 * @property {boolean} isTimerModalVisible Is the timer modal visible.
 * @property {Object[]} OVERLAY_OPTIONS The overlay buttons.
 * @property {boolean} isPrompterVisible Is the prompter visible.
 */
type useOverlayModuleController = {
  isAssistantVisible: boolean
  onTimerPress: () => void
  isTimerModalVisible: boolean
  OVERLAY_OPTIONS: OverlayOption[]
  isPrompterVisible: boolean
}

/**
 * @typedef Props
 * @description Type for the props of the useOverlayModuleController custom hook.
 * @property {number} defaultTimerValue The default timer value.
 * @property {boolean} isTimerModalVisible Is the timer modal visible.
 * @property {function} setIsTimerModalVisible Set the timer modal visibility.
 */
type Props = {
  defaultTimerValue: number
  isTimerModalVisible: boolean
  setIsTimerModalVisible: React.Dispatch<React.SetStateAction<boolean>>
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
 * @param {defaultTimerValue} number The default timer value.
 * @param {defaultEndTimerValue} number The default end timer value.
 * @param {isTimerModalVisible} boolean Is the timer modal visible.
 * @returns {useOverlayModuleController} Variables that alters the OverlayModule.
 */
const useOverlayModuleController = ({
  defaultTimerValue,
  isTimerModalVisible,
  setIsTimerModalVisible,
}: Props): useOverlayModuleController => {
  const [isAssistantVisible, setIsAssistantVisible] = useState(false)
  const [isPrompterVisible, setIsPrompterVisible] = useState(false)

  const toggleAssistant = () => setIsAssistantVisible(!isAssistantVisible)

  const toggleTimer = () => setIsTimerModalVisible(!isTimerModalVisible)

  const togglePrompter = () => setIsPrompterVisible(!isPrompterVisible)

  useFocusEffect(
    useCallback(() => {
      setIsAssistantVisible(true)

      return () => {
        setIsTimerModalVisible(false)
        setIsPrompterVisible(false)
      }
    }, [setIsTimerModalVisible])
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
      title: 'Prompteur',
      icon: images.icons.outline.text(),
      onPress: togglePrompter,
      isActivated: () => {
        return isPrompterVisible
      },
    },
    {
      title: 'Minuteur',
      icon: images.icons.outline.clock(),
      onPress: toggleTimer,
      isActivated: () => {
        return defaultTimerValue > 0
      },
    },
  ]

  return {
    isAssistantVisible,
    onTimerPress: toggleTimer,
    isTimerModalVisible,
    OVERLAY_OPTIONS,
    isPrompterVisible,
  }
}

export default useOverlayModuleController
