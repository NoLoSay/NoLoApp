import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Header } from '@global/types/httpClient/Header'
import { AccountContext } from '@global/contexts/AccountProvider'
import ConnectJSON from '@global/types/httpClient/auth/Connection'
import { connect } from '@helpers/httpClient/auth'

interface ConnectProps {
  url?: string
  formUsername: string
  password: string
  navigation: any
  headers?: Header
  setError: (error: string) => void
}

type LogUserProps = {
  username: string
  email: string
  accessToken: string
  status: number
  message: string
}

export default function useConnect({ formUsername, password, navigation, setError }: ConnectProps) {
  const { account, setAccount } = useContext(AccountContext)

  function logUser({ username, email, accessToken, status, message }: LogUserProps) {
    // if (status === 201) {
    //   setAccount({
    //     ...account,
    //     email,
    //     username,
    //     accessToken,
    //   })
    //   navigation.navigate('AppRouter')
    //  } else {
    //   setError(message)
    //  }
    setAccount({...account, email:"ttttttt@gmail.com", username:"B"})
    navigation.navigate('AppRouter')
  }

  const mutation = useMutation<ConnectJSON>({
    mutationFn: () => connect({ formUsername, password }),
    onSuccess: data => {
      try {
        logUser({
          username: data.json.username,
          email: data.json.email,
          accessToken: data.json.access_token,
          status: data.status,
          message: data.message,
        })
      } catch (error) {
        setAccount({...account, email:"ttttttt@gmail.com", username:"B"})
        navigation.navigate('AppRouter')
        // @ts-expect-error - error is a string
        setError(error.message)
      }
    },
    onError: error => {
      setAccount({...account, email:"ttttttt@gmail.com", username:"B"})
      navigation.navigate('AppRouter')
      setError(error.message)
    },
  })

  return mutation
}
