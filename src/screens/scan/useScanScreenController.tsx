/**
 * @fileoverview Scan screen controller.
 * @module useScanScreenController
 * @description Controller for the scan screen.
 * @requires react react
 */

import { AccountContext } from '@source/global/contexts/AccountProvider'
import {
  CameraDevice,
  Code,
  CodeScanner,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera'
import { AccountType } from '@source/global/types/Account'
import { useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

interface ScanScreenController {
  account: AccountType
  hasPermission: boolean
  backCamera: CameraDevice | undefined
  isQRScanningActive: boolean
  codeScanner: CodeScanner
  toggleQRScanning: () => void
}

/**
 * @function useScanScreenController
 * @description Controller that handles the logic for the scan screen.
 * @returns {ScanScreenController} Scan screen controller.
 */
export default function useScanScreenController(): ScanScreenController {
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

  function handleQRScanning(codes: Code[]) {
    setIsQRScanningActive(false)
    if (isQRScanningActive)
      Alert.alert('Code scanned', codes[codes.length - 1].value, [
        {
          text: 'Open',
          onPress: () => {
            console.log(`Open ${codes[codes.length - 1].value}` ?? 'No value')
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ])
  }

  function toggleQRScanning() {
    setIsQRScanningActive(!isQRScanningActive)
  }

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  return {
    account,
    hasPermission,
    backCamera,
    isQRScanningActive,
    codeScanner,
    toggleQRScanning,
  }
}
