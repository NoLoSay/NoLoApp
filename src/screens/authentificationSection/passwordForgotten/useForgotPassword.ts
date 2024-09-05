/**
 * @module useForgotPassword
 * @description Controller for the ForgotPassword screen.
 * @requires react
 */
import { forgotPassword } from '@helpers/httpClient/queries/auth/auth'
import { useState } from 'react'

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
    await forgotPassword({ email })
  }

  return {
    email,
    setEmail,
    sendEmail,
  }
}

export default useForgotPassword
