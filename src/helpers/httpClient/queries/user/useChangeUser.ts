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
        userId: account.accountID,
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
