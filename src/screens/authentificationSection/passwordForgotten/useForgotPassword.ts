/**
 * @module useForgotPassword
 * @description Controller for the ForgotPassword screen.
 * @requires react
 */
import { forgotPassword } from '@helpers/httpClient/queries/auth/auth'
import { useState } from 'react'
import { Alert, Linking } from 'react-native'

type ForgotPassword = {
  email: string
  setEmail: (email: string) => void
  sendEmail: () => void
}

/**
 * @function useForgotPasswordController
 * @description Controller for the ForgotPassword screen.
 * @returns {ForgotPassword} Object containing the email, setEmail and sendEmail.
 */
const useForgotPassword = (): ForgotPassword => {
  const [email, setEmail] = useState('')

  const sendEmail = async () => {
    forgotPassword({ email }).then(() => {
      Alert.alert('Email envoyé', 'Un email vous a été envoyé pour réinitialiser votre mot de passe.', [
        {
          text: "Voir l'email",
          onPress: () => Linking.openURL('message://'),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ])
    })
  }

  return {
    email,
    setEmail,
    sendEmail,
  }
}

export default useForgotPassword
