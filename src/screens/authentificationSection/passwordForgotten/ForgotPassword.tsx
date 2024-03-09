/**
 * @file ForgotPassword.tsx
 * @module ForgotPassword - ForgotPassword Screen
 * @description The forgot password screen.
 * @requires react
 * @requires react-native
 */
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import images from '@global/images'
import { ForgotPasswordScreenProps } from '@global/types/screensProps/AuthStackParams'
import Button from '@components/Button'
import useForgotPassword from './useForgotPassword'
import TopBar from './Views/TopBar'
import Input from '../sharedViews/TextInput'

/**
 * @function ForgotPassword
 * @description Component that renders the forgot password screen.
 * @param {ForgotPasswordScreenProps} props ForgotPassword screen props
 * @param props.navigation Navigation props
 * @returns {React.JSX.Element} App component template
 */
export default function ForgotPassword({ navigation }: ForgotPasswordScreenProps): React.JSX.Element {
  const { email, setEmail, sendEmail } = useForgotPassword()

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        navigation={navigation}
        text='Mot de passe oublié'
      />
      <View style={styles.mainView}>
        <Text style={styles.title}>Ça arrive à tout le monde, pas de problème 😉</Text>
        <Text style={styles.textStyle}>
          Si l&apos;email ou le nom d&apos;utilisateur est dans notre base de données, vous devriez recevoir un mail
          d&apos;ici quelques minutes de notre part afin de réinitialiser votre mot de passe.
        </Text>
        <Input
          placeholder="Email ou nom d'utilisateur"
          keyboardType='email-address'
          value={email}
          setValue={setEmail}
          leftIcon={images.icons.full.user()}
          containerStyle={styles.inputStyle}
        />
        <Button
          text='Envoyer'
          onPress={sendEmail}
          style={styles.buttonStyle}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginBottom: 20,
  },
  buttonStyle: {
    marginHorizontal: 32,
    marginTop: 20,
  },
  inputStyle: {
    marginHorizontal: 16,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'justify',
    marginHorizontal: 16,
  },
})
