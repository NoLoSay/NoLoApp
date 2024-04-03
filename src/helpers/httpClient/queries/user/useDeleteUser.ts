import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AccountContext, defaultAccount } from '@global/contexts/AccountProvider'
import DeleteUserJSON from '@global/types/httpClient/user/DeleteUser'
import deleteAccount from './deleteUser'

interface DeleteUserProps {
  setError: (error: string) => void
}

export default function useDeleteUser({ setError }: DeleteUserProps) {
  const { account, setAccount } = useContext(AccountContext)

  const mutation = useMutation<DeleteUserJSON>({
    mutationFn: () =>
      deleteAccount({
        userId: account.accountID,
        accessToken: account.accessToken,
      }),
    onSuccess: () => {
      try {
        setAccount(defaultAccount)
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
