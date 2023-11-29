/**
 * @module useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @requires react
 */
import { useState } from 'react'

/**
 * @typedef useOverlayModuleController
 * @description Type for the useOverlayModuleController custom hook.
 * @property {boolean} isAssistantVisible Is the assistant visible.
 * @property {function} toggleAssistant Toggle the assistant.
 */
type useOverlayModuleController = {
  isAssistantVisible: boolean
  toggleAssistant: () => void
}
/**
 * @function useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @returns {useOverlayModuleControllerProps} Variable that alters the OverlayModule.
 */
const useOverlayModuleController = (): useOverlayModuleController => {
  const [isAssistantVisible, setIsAssistantVisible] = useState(false)

  const toggleAssistant = () => setIsAssistantVisible(!isAssistantVisible)

  return {
    isAssistantVisible,
    toggleAssistant,
  }
}

export default useOverlayModuleController
