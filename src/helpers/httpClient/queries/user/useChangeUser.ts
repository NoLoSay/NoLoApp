import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Header } from '@global/types/httpClient/Header'
import { AccountContext } from '@global/contexts/AccountProvider'
import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'
import changeUser from './changeUser'

interface ChangeUserProps {
  formUsername: string
}

type SetNewAccountInfoProps = {
  username: string
}

export default function useChangeUser({ formUsername }: ChangeUserProps) {
  const { account, setAccount } = useContext(AccountContext)

  function setNewAccountInfo({ username }: SetNewAccountInfoProps) {
    setTimeout(() => {
      setAccount({
        ...account,
        username,
      })
    }, 2000)
  }

  const mutation = useMutation<ChangeUserJSON>({
    mutationFn: () => {
      return Promise.resolve({
        json: {
          username: formUsername,
        },
        status: 200,
        message: 'Success',
      })
    },
    onSuccess: data => {
      try {
        setNewAccountInfo({
          username: data.json.username,
        })
      } catch (error) {
        console.log(error)
      }
    },
    onError: error => {
      console.error(error)
    },
  })

  return mutation
}
