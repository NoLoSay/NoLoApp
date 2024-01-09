/**
 * @fileoverview Scan screen controller.
 * @module useScanScreenController
 * @description Controller for the scan screen.
 * @requires react react
 */

import {
  CameraDevice,
  Code,
  CodeScanner,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { AccountType } from '../../global/types/Account'
import { AccountContext } from '../../global/contexts/AccountProvider'

interface ScanScreenController {
  account: AccountType
  hasPermission: boolean
  backCamera: CameraDevice | undefined
  isQRScanningActive: boolean
  codeScanner: CodeScanner
  navigateToVideoConsumption: (videoId: string) => void
}

/**
 * @function useScanScreenController
 * @description Controller that handles the logic for the scan screen.
 * @returns {ScanScreenController} Scan screen controller.
 */
export default function useScanScreenController({ navigation }: any): ScanScreenController {
  const { account } = useContext(AccountContext)
  const { hasPermission, requestPermission } = useCameraPermission()
  const backCamera = useCameraDevice('back')
  const [isQRScanningActive, setIsQRScanningActive] = useState(true)
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      handleQRScanning(codes)
    },
  })

  // React-navigation hook allowing us to know when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setIsQRScanningActive(true)

      return () => {
        setIsQRScanningActive(false)
      }
    }, [])
  )

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  function navigateToVideoConsumption(videoId: string | undefined) {
    navigation.navigate('VideoConsumptionModal', {
      videoId,
      title: "Titre de l'oeuvre",
      videoText:
        'Do qui commodo cupidatat dolor velit dolor elit consequat mollit incididunt nisi officia. Exercitation aute ut dolore eiusmod ut aute veniam nostrud id laboris amet in culpa dolore.',
    })
  }

  function handleQRScanning(codes: Code[]) {
    setIsQRScanningActive(false)
    if (isQRScanningActive)
      Alert.alert('Code scanned', codes[codes.length - 1].value, [
        {
          text: 'Open',
          onPress: () => {
            console.log(`Open ${codes[codes.length - 1].value}`)
            navigateToVideoConsumption(codes[codes.length - 1].value)
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setIsQRScanningActive(true)
          },
        },
      ])
  }

  return {
    account,
    hasPermission,
    backCamera,
    isQRScanningActive,
    codeScanner,
    navigateToVideoConsumption,
  }
}
