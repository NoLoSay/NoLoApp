/**
 * @fileoverview Connection screen component
 * @module ConnectionScreen
 * @description Connection screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
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
import LoadingModal from '../sharedViews/LoadingModal'

/**
 * @function ConnectionScreen
 * @description Component that renders the connection screen.
 * @param {ConnectionScreenProps} props ConnectionScreen props
 * @param props.navigation Navigation props
 * @returns {React.JSX.Element} App component template
 */
export default function ConnectionScreen({ navigation }: ConnectionScreenProps): React.JSX.Element {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    connect,
    forgottenPassword,
    error,
    isLoading,
  } = useConnectionController({ navigation })

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={images.logos.nolosay()}
      />
      <View style={styles.connection}>
        <HeaderTexts />
        <View style={styles.inputContainer}>
          <View style={styles.textInputsContainer}>
            <Input
              placeholder="Email ou nom d'utilisateur"
              keyboardType='email-address'
              value={email}
              setValue={setEmail}
              leftIcon={images.icons.full.user()}
              returnKeyType='next'
            />
            <Input
              placeholder='Mot de passe'
              secureTextEntry={!showPassword}
              setSecureTextEntry={setShowPassword}
              value={password}
              setValue={setPassword}
              leftIcon={images.icons.full.shield()}
              rightIcon={images.icons.full.eye()}
              returnKeyType='done'
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              onPress={forgottenPassword}
              style={styles.forgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Un trou de mémoire ?</Text>
            </TouchableOpacity>
          </View>
          <OrSeparator />
          <SocialButtons />
        </View>
        <Button
          text='Se connecter'
          onPress={connect}
          style={styles.connectionButton}
        />
        <ButtonChangeScreen
          infoText='Pas de compte ?'
          clickableText="S'inscrire"
          onPress={() => navigation.navigate('Subscription')}
        />
      </View>
      <LoadingModal visible={isLoading} />
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
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'column',
    paddingVertical: 24,
  },
  textInputsContainer: {
    marginBottom: 12,
  },
  errorText: {
    color: colors.error,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'flex-end',
    paddingRight: '16%',
    fontSize: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginHorizontal: 52,
    marginTop: 8,
  },
  forgotPasswordText: {
    color: colors.accent,
    fontFamily: 'Poppins',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  connectionButton: {
    marginVertical: 12,
  },
})
