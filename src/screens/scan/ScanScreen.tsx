/**
 * @fileoverview Scan screen component
 * @module ScanScreen
 * @description Scan screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { Camera } from 'react-native-vision-camera'
import FastImage from 'react-native-fast-image'
import { colors } from '@global/colors'
import images from '@global/images'
import useScanScreenController from './useScanScreenController'
import NoCameraView from './Views/NoCameraView'

/**
 * @function ScanScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function ScanScreen(): React.JSX.Element {
  const { hasPermission, backCamera, isQRScanningActive, codeScanner, hasLoaded } = useScanScreenController()

  if (!backCamera || !hasPermission) return <NoCameraView hasPermission={hasPermission} />
  return (
    <SafeAreaView style={styles.container}>
      {hasLoaded ? (
        <>
          <Camera
            style={styles.camera}
            device={backCamera}
            isActive={isQRScanningActive}
            codeScanner={codeScanner}
          />
          <FastImage
            source={images.icons.qrScanner()}
            style={styles.qrScannerImage}
          />
          <Text style={styles.title}>Scanner un QR Code</Text>
          <Text style={styles.subtitle}>Placez le QR code dans le rectangle afin de le scanner</Text>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
  },
  camera: {
    width: '80%',
    height: '50%',
    position: 'absolute',
    top: '20%',
    left: '5%',
  },
  qrScannerImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    top: '47%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: colors.accent,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 24,
  },
  subtitle: {
    color: colors.darkGrey,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    width: '75%',
    textAlign: 'center',
  },
})
