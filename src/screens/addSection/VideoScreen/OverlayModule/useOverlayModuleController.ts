import { useState } from 'react'

const useOverlayModuleController = () => {
  const [isAssistantVisible, setIsAssistantVisible] = useState(false)

  const toggleAssistant = () => setIsAssistantVisible(!isAssistantVisible)

  return {
    isAssistantVisible,
    toggleAssistant,
  }
}

export default useOverlayModuleController
