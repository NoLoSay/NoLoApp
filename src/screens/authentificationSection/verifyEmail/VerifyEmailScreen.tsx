/**
 * @fileoverview View for the VerifyEmail screen when a user subscribes to the app.
 * @module VerifyEmail
 * @description View for the VerifyEmail screen when a user subscribes to the app.
 * @requires react react
 */

import React from 'react'
import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colors } from '@global/colors'
import FastImage from 'react-native-fast-image'
import images from '@global/images'
import Button from '@components/Button'
import { VerifyEmailScreenProps } from '@global/types/screensProps/AuthStackParams'

/**
 * @function VerifyEmail
 * @description Component that renders the VerifyEmail screen.
 * @returns {React.JSX.Element} VerifyEmail component template
 */
export default function VerifyEmail({ navigation }: VerifyEmailScreenProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        source={images.logos.nolosay()}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>
          Nous vous avons envoyé un email avec un lien pour vérifier votre compte.
        </Text>

        <Button
          text="Ouvrir l'application Mail"
          onPress={() => Linking.openURL('message://')}
          style={styles.buttonStyle}
        />
        <Button
          text='Se connecter'
          onPress={() => navigation.navigate('Connection')}
          style={styles.buttonStyle}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    marginTop: 32,
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
    marginHorizontal: 42,
  },
})
