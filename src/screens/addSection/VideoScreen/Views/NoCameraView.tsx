/**
 * @fileoverview View for the scan screen when the camera is not available.
 * @module NoCameraView
 * @description View for the scan screen when the camera is not available.
 * @requires react react
 */

import React from 'react'
import { Alert, Linking, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import DeviceInfo from 'react-native-device-info'
import Clipboard from '@react-native-clipboard/clipboard'
import images from '../../../../global/images'
import Button from '../../../../components/Button'
import { colors } from '../../../../global/colors'

interface NoCameraViewProps {
  hasPermission: boolean
}

function PermissionNotGranted(): React.JSX.Element {
  return (
    <>
      <Text style={styles.descriptionText}>
        Vous ne nous avez pas autorisé à utiliser votre caméra, la prise de vidéo est donc impossible.
      </Text>
      <Button
        text='Autoriser'
        onPress={Linking.openSettings}
        style={styles.buttonStyle}
      />
    </>
  )
}

function NoCamera(): React.JSX.Element {
  return (
    <>
      <Text style={styles.descriptionText}>
        Il est probable que votre caméra ne soit pas disponible ou que vous n&apos;avez pas de caméra sur votre
        appareil.
      </Text>
      <Text style={styles.descriptionText}>Si vous pensez que c&apos;est une erreur, veuillez nous contacter.</Text>
      {!DeviceInfo.isEmulator() && (
        <Button
          text='Nous contacter'
          onPress={() => Linking.openURL('mailto:johan@chrillesen.net')}
          style={styles.buttonStyle}
        />
      )}
    </>
  )
}

/**
 * @function NoCameraView
 * @description Component that renders the NoCameraView.
 * @returns {React.JSX.Element} NoCameraView component template
 */
export default function NoCameraView({ hasPermission }: NoCameraViewProps): React.JSX.Element {
  async function createDebugText() {
    Clipboard.setString(
      `${
        `Brand: ${DeviceInfo.getBrand()}` +
        ` / Model: ${DeviceInfo.getModel()}` +
        ` / SystemName: ${DeviceInfo.getSystemName()}` +
        ` / SystemVersion: ${DeviceInfo.getSystemVersion()}` +
        ` / Emulator: ${await DeviceInfo.isEmulator().then(value => value.toString())}` +
        ` / DeviceType: ${await DeviceInfo.getType().then(type => type)}`
      }${
        Platform.OS === 'android'
          ? ` / AndroidId: ${await DeviceInfo.getAndroidId().then(id => id ?? 'No id')}` +
            ` / APILevel: ${(await DeviceInfo.getApiLevel().then(level => level ?? 'No level')).toString()}`
          : ''
      }`
    )
    Alert.alert('Texte de debug créé', 'Le texte de debug a été copié dans le presse-papier.')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        delayLongPress={3000}
        onLongPress={() => createDebugText()}
      >
        <FastImage
          source={images.logos.nolosad()}
          style={styles.image}
        />
      </Pressable>
      <View style={styles.contentContainer}>{!hasPermission ? <PermissionNotGranted /> : <NoCamera />}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: '60%',
    aspectRatio: 2.59,
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '500',
    paddingHorizontal: 32,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 32,
  },
})
