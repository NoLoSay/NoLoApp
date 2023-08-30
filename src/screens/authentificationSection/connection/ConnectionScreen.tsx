/**
 * @fileoverview Connection screen component
 * @module ConnectionScreen
 * @description Connection screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { colors } from '@global/colors'
import { ConnectionScreenProps } from '@source/global/types/screensProps/AuthStackParams'
import Button from '@components/Button'
import images from '@source/global/images'
import OrSeparator from '../sharedViews/OrSeparator'
import SocialButtons from '../sharedViews/SocialButtons'
import ButtonChangeScreen from '../sharedViews/ButtonChangeScreen'
import Input from '../sharedViews/TextInput'
import HeaderTexts from './Views/HeaderTexts'
import useConnectionController from './useConnectionController'

/**
 * @function ConnectionScreen
 * @description Component that renders the connection screen.
 * @returns {React.JSX.Element} App component template
 */
export default function ConnectionScreen({ navigation }: ConnectionScreenProps): React.JSX.Element {
  const { email, setEmail, password, setPassword, showPassword, setShowPassword, connect, forgottenPassword, error } =
    useConnectionController({ navigation })

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      <Image
        style={styles.logo}
        source={images.logos.nolosay}
      />
      <View style={styles.connection}>
        <HeaderTexts />
        <View style={{ flexDirection: 'column', paddingVertical: 24 }}>
          <View style={{ marginBottom: 12 }}>
            <Input
              placeholder="Email ou nom d'utilisateur"
              keyboardType='email-address'
              value={email}
              setValue={setEmail}
              leftIcon={images.icons.full.user}
            />
            <Input
              placeholder='Mot de passe'
              secureTextEntry={!showPassword}
              setSecureTextEntry={setShowPassword}
              value={password}
              setValue={setPassword}
              leftIcon={images.icons.full.shield}
              rightIcon={images.icons.full.eye}
            />
            {error && (
              <Text
                style={{
                  color: colors.error,
                  fontFamily: 'Poppins-Medium',
                  alignSelf: 'flex-end',
                  paddingRight: '16%',
                  fontSize: 12,
                }}
              >
                {error}
              </Text>
            )}

            <TouchableOpacity
              onPress={forgottenPassword}
              style={{ alignSelf: 'flex-end', marginHorizontal: 52, marginTop: 8 }}
            >
              <Text
                style={{
                  color: colors.accent,
                  fontFamily: 'Poppins',
                  textDecorationLine: 'underline',
                  fontWeight: '600',
                }}
              >
                Un trou de mémoire ?
              </Text>
            </TouchableOpacity>
          </View>
          <OrSeparator />
          <SocialButtons />
        </View>
        <Button
          text='Se connecter'
          onPress={connect}
          style={{ marginVertical: 12 }}
        />
        <ButtonChangeScreen
          infoText='Pas de compte ?'
          clickableText="S'inscrire"
          onPress={() => navigation.navigate('Subscription')}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  connection: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderRadius: 12,
    backgroundColor: colors.darkGrey,
    paddingHorizontal: 12,
    paddingVertical: 20,
    fontSize: 12,
    color: colors.lightGrey,
    fontFamily: 'Poppins-Medium',
    width: '100%',
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
