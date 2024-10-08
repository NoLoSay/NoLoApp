/**
 * @fileoverview useRegister hook to register a user
 * @module useRegister
 * @requires react
 * @requires @tanstack/react-query
 */
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Header } from '@global/types/httpClient/Header'
import { AccountContext } from '@global/contexts/AccountProvider'
import RegisterJSON from '@global/types/httpClient/auth/Registration'
import { subscribe } from '@helpers/httpClient/queries/auth/auth'

interface RegisterProps {
  url?: string
  formUsername: string
  formEmail: string
  password: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
  headers?: Header
  setError: (error: string) => void
}

type RegisterUserProps = {
  username: string
  email: string
  status: number
  message: string
}

/**
 * @function useRegister Handles the register mutation
 * @param props The username, email, password, navigation, and setError function
 * @param props.formUsername The user's username
 * @param props.formEmail The user's email
 * @param props.password The user's password
 * @param props.navigation The navigation object
 * @param props.setError The function to set the error
 * @returns The mutation object
 */
export default function useRegister({ formEmail, formUsername, password, navigation, setError }: RegisterProps) {
  const { account, setAccount } = useContext(AccountContext)

  function registerUser({ username, email, status, message }: RegisterUserProps) {
    if (status === 201) {
      setAccount({
        ...account,
        email,
        username,
      })
      navigation.navigate('VerifyEmail')
    } else {
      setError(message)
    }
  }

  const mutation = useMutation<RegisterJSON>({
    mutationFn: () => subscribe({ email: formEmail, username: formUsername, password }),
    onSuccess: data => {
      try {
        registerUser({
          username: data.json.username,
          email: data.json.email,
          status: data.status,
          message: data.message,
        })
      } catch (error) {
        // @ts-expect-error - error is a string
        setError(error.message)
      }
    },
    onError: error => {
      setError(error.message)
    },
  })

  return mutation
}
