/**
 * @fileoverview Subscription screen component
 * @module SubscriptionScreen
 * @description Subscription screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, View, Image, StyleSheet, TextInput, KeyboardType, Pressable } from 'react-native'
import { colors } from '@global/colors'
import { SubscriptionScreenProps } from '@source/global/types/screensProps/AuthStackParams'
import Button from '@components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFacebookF, faApple, faGoogle } from '@fortawesome/free-brands-svg-icons'
import OrSeparator from '../sharedViews/OrSeparator'
import ButtonChangeScreen from '../sharedViews/ButtonChangeScreen'
import HeaderTexts from './Views/HeaderTexts'

/**
 * @function SubscriptionScreen
 * @description Component that renders the Subscription screen.
 * @returns {React.JSX.Element} App component template
 */
export default function SubscriptionScreen({ navigation }: SubscriptionScreenProps): React.JSX.Element {
  interface InputProps {
    placeholder: string
    secureTextEntry?: boolean
    keyboardType?: KeyboardType
  }

  function Input({ placeholder, secureTextEntry = false, keyboardType = 'default' }: InputProps) {
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingLeft: 52, paddingRight: 52 }}
      >
        <TextInput
          placeholderTextColor={colors.lightGrey}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={styles.input}
        />
      </View>
    )
  }

  function SocialButtons() {
    // Create a component that renders the social buttons (Google, Facebook, Apple), they should be squared
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
          paddingHorizontal: 24,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            styles.socialButton,
            { backgroundColor: colors.facebook, opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <FontAwesomeIcon
            icon={faFacebookF}
            size={24}
            color={colors.white}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.socialButton, { backgroundColor: colors.black, opacity: pressed ? 0.5 : 1 }]}
        >
          <FontAwesomeIcon
            icon={faApple}
            size={24}
            color={colors.white}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.socialButton, { backgroundColor: colors.google, opacity: pressed ? 0.5 : 1 }]}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            size={28}
            color={colors.black}
          />
        </Pressable>
      </View>
    )
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      <Image
        style={styles.logo}
        source={require('@assets/images/logos/light/nolosay.png')}
      />
      <View style={styles.connection}>
        <HeaderTexts />
        <View style={{ flexDirection: 'column', paddingVertical: 24 }}>
          <View style={{ marginBottom: 12 }}>
            <Input
              placeholder={'Email'}
              keyboardType='email-address'
            />
            <Input
              placeholder={'+33 06 12 34 56 78'}
              keyboardType='phone-pad'
            />
            <Input
              placeholder={'Mot de passe'}
              secureTextEntry
            />
          </View>
          <OrSeparator />
          <SocialButtons />
        </View>
        <Button
          text="S'inscrire"
          onPress={() => navigation.navigate('AppRouter')}
          style={{ marginVertical: 12 }}
        />
        <ButtonChangeScreen
          infoText='Déjà un compte ?'
          clickableText='Se connecter'
          onPress={() => navigation.navigate('Connection')}
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
