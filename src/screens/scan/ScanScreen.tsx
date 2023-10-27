/**
 * @fileoverview Scan screen component
 * @module ScanScreen
 * @description Scan screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '@global/colors'
import { Camera } from 'react-native-vision-camera'
import useScanScreenController from './useScanScreenController'
import NoCameraView from './Views/NoCameraView'

/**
 * @function ScanScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function ScanScreen(): React.JSX.Element {
  const { hasPermission, backCamera, isQRScanningActive, codeScanner, toggleQRScanning } = useScanScreenController()

  if (backCamera === undefined || !hasPermission) return <NoCameraView hasPermission={hasPermission} />
  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        device={backCamera}
        isActive={isQRScanningActive}
        codeScanner={codeScanner}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={toggleQRScanning}
      >
        <Text>{isQRScanningActive ? 'Pause' : 'Resume'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
  },
  camera: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    top: '20%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
