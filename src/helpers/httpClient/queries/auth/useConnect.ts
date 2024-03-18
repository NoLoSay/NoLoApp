import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Header } from '@global/types/httpClient/Header'
import { AccountContext, defaultAccount } from '@global/contexts/AccountProvider'
import ConnectJSON from '@global/types/httpClient/auth/Connection'
import { connect } from '@helpers/httpClient/queries/auth/auth'
import { AccountElevationEnum } from '@global/types/Account'

interface ConnectProps {
  url?: string
  formUsername: string
  password: string
  navigation: any
  headers?: Header
  setError: (error: string) => void
}

type LogUserProps = {
  id: number
  uuid: string
  username: string
  email: string
  picture: string | null
  telNumber: string | null
  role: string
  accessToken: string
  createdAt: string
  status: number
  message: string
}

export default function useConnect({ formUsername, password, navigation, setError }: ConnectProps) {
  const { account, setAccount } = useContext(AccountContext)

  function giveRole(role: string): AccountElevationEnum {
    switch (role) {
      case 'ADMIN':
        return AccountElevationEnum.ADMIN
      case 'REFERENT':
        return AccountElevationEnum.REFERENT
      default:
        return AccountElevationEnum.USER
    }
  }

  function logUser({
    id,
    uuid,
    username,
    email,
    picture,
    telNumber,
    accessToken,
    role,
    createdAt,
    status,
    message,
  }: LogUserProps) {
    if (status === 201) {
      setAccount({
        ...account,
        accountID: id,
        uuid,
        email,
        username,
        image: picture ?? defaultAccount.image,
        phoneNumber: telNumber ?? '',
        elevation: giveRole(role),
        accessToken,
        createdAt: new Date(createdAt),
      })
      navigation.navigate('AppRouter')
    } else {
      setError(message)
    }
  }

  const mutation = useMutation<ConnectJSON>({
    mutationFn: () => connect({ formUsername, password }),
    onSuccess: data => {
      try {
        logUser({
          id: data.json.id,
          uuid: data.json.uuid,
          username: data.json.username,
          email: data.json.email,
          picture: data.json.picture,
          telNumber: data.json.telNumber,
          role: data.json.role,
          accessToken: data.json.accessToken,
          createdAt: data.json.createdAt,
          status: data.status,
          message: data.message,
        })
      } catch (error) {
        console.log(error)
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
