/**
 * @fileoverview useChangeUser hook
 * @module useChangeUser
 * @requires react
 * @requires @tanstack/react-query
 */
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AccountContext } from '@global/contexts/AccountProvider'
import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'
import changeUser from './changeUser'

interface ChangeUserProps {
  formUsername: string
  formEmail: string
  formPhoneNumber: string
  setError: (error: string) => void
}

type SetNewAccountInfoProps = {
  username: string
  email: string
  phoneNumber: string
}

/**
 * @function useChangeUser Handles the change user mutation
 * @param props The username, email, phone number, and setError function
 * @param props.formUsername The user's username
 * @param props.formEmail The user's email
 * @param props.formPhoneNumber The user's phone number
 * @param props.setError The function to set the error
 * @returns The mutation object
 */
export default function useChangeUser({ formUsername, formEmail, formPhoneNumber, setError }: ChangeUserProps) {
  const { account, setAccount } = useContext(AccountContext)

  function setNewAccountInfo({ username, email, phoneNumber }: SetNewAccountInfoProps) {
    setAccount({
      ...account,
      username,
      email,
      phoneNumber,
    })
  }

  const mutation = useMutation<ChangeUserJSON>({
    mutationFn: () =>
      changeUser({
        username: formUsername,
        email: formEmail,
        phoneNumber: formPhoneNumber,
        authToken: account.accessToken,
      }),
    onSuccess: data => {
      try {
        setNewAccountInfo({
          username: data.json.username,
          email: data.json.email,
          phoneNumber: data.json.telNumber,
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
