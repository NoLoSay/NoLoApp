/**
 * @module useOverlayModuleController
 * @description Logic for the OverlayModule.
 * @requires react
 */
import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'

type useOverlayModuleController = {
  account: AccountType
  svRef: RefObject<ScrollView>
}

type Props = {
  isRecording: boolean
  speed: number
}

const useOverlayModuleController = ({ isRecording, speed }: Props): useOverlayModuleController => {
  const { account } = useContext(AccountContext)
  const [yPosition, setYPosition] = useState(0)
  const svRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (!isRecording) {
      setYPosition(0)
      svRef.current?.scrollTo({ y: 0, animated: true })
    }
    if (isRecording) {
      setTimeout(() => {
        const newPos = yPosition + speed
        setYPosition(newPos)
        svRef.current?.scrollTo({ y: newPos, animated: true })
      }, 250)
    }
  }, [isRecording, yPosition, speed])

  return {
    account,
    svRef,
  }
}

export default useOverlayModuleController
