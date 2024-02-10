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
import { Alert, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { AccountType } from '@global/types/Account'
import { AccountContext } from '@global/contexts/AccountProvider'

interface ScanScreenController {
  account: AccountType
  hasPermission: boolean
  backCamera: CameraDevice | undefined
  isQRScanningActive: boolean
  codeScanner: CodeScanner
  hasLoaded: boolean
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
  const [hasLoaded, setHasLoaded] = useState(false)

  // React-navigation hook allowing us to know when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setIsQRScanningActive(true)
      if (Platform.OS === 'android') {
        setTimeout(() => {
          setHasLoaded(true)
        }, 1500)
      }

      return () => {
        setIsQRScanningActive(false)
      }
    }, [])
  )

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
    if (hasPermission) {
      setIsQRScanningActive(true)
      if (Platform.OS === 'android') {
        setTimeout(() => {
          setHasLoaded(true)
        }, 1500)
      }
    }
  }, [hasPermission, requestPermission])

  function handleQRScanning(codes: Code[]) {
    setIsQRScanningActive(false)
    if (isQRScanningActive)
      Alert.alert('Code scanned', codes[codes.length - 1].value, [
        {
          text: 'Open',
          onPress: () => {
            console.log(`Open ${codes[codes.length - 1].value}`)
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
    hasLoaded: Platform.OS === 'android' ? hasLoaded : true,
  }
}
