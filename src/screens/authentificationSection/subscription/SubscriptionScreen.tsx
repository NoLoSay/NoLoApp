/**
 * @fileoverview Subscription screen component
 * @module SubscriptionScreen
 * @description Subscription screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, View, Image, StyleSheet, Text } from 'react-native'
import { SubscriptionScreenProps } from '@global/types/screensProps/AuthStackParams'
import images from '@global/images'
import { colors } from '@global/colors'
import Button from '@components/Button'
import LoadingModal from '@components/LoadingModal'
import OrSeparator from '../sharedViews/OrSeparator'
import SocialButtons from '../sharedViews/SocialButtons'
import ButtonChangeScreen from '../sharedViews/ButtonChangeScreen'
import HeaderTexts from './Views/HeaderTexts'
import useSubscriptionController from './useSubscriptionController'
import Input from '../sharedViews/TextInput'

/**
 * @function SubscriptionScreen
 * @description Component that renders the Subscription screen.
 * @returns {React.JSX.Element} App component template
 */
export default function SubscriptionScreen({ navigation }: SubscriptionScreenProps): React.JSX.Element {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    showPassword,
    setShowPassword,
    showPasswordConfirmation,
    setShowPasswordConfirmation,
    subscribe,
    error,
    isLoading,
  } = useSubscriptionController({ navigation })

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      <Image
        style={styles.logo}
        source={images.logos.nolosay()}
      />
      <View style={styles.connection}>
        <HeaderTexts />
        <View style={styles.inputContainer}>
          <View style={styles.textInputsContainer}>
            <Input
              placeholder='Email'
              keyboardType='email-address'
              value={email}
              setValue={setEmail}
              leftIcon={images.icons.full.username()}
            />
            <Input
              placeholder="Nom d'utilisateur"
              keyboardType='email-address'
              value={username}
              setValue={setUsername}
              leftIcon={images.icons.full.user()}
            />
            <Input
              placeholder='Mot de passe'
              secureTextEntry={!showPassword}
              setSecureTextEntry={setShowPassword}
              value={password}
              setValue={setPassword}
              leftIcon={images.icons.full.shield()}
              rightIcon={images.icons.full.eye()}
            />
            <Input
              placeholder='Confirmation'
              secureTextEntry={!showPasswordConfirmation}
              setSecureTextEntry={setShowPasswordConfirmation}
              value={passwordConfirmation}
              setValue={setPasswordConfirmation}
              leftIcon={images.icons.full.shield()}
              rightIcon={images.icons.full.eye()}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <OrSeparator />
          <SocialButtons />
        </View>
        <Button
          text="S'inscrire"
          onPress={subscribe}
          style={{ marginVertical: 12, marginHorizontal: 48 }}
        />
        <ButtonChangeScreen
          infoText='Déjà un compte ?'
          clickableText='Se connecter'
          onPress={() => navigation.navigate('Connection')}
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
  errorText: {
    color: colors.error,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'flex-end',
    paddingRight: '16%',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'column',
    paddingVertical: 24,
  },
  textInputsContainer: {
    marginBottom: 12,
  },
})
