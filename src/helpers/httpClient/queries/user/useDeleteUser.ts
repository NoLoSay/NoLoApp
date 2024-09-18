/**
 * @fileoverview useDeleteUser handles the delete user mutation
 * @module useDeleteUser
 * @requires react
 * @requires @tanstack/react-query
 */
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AccountContext, defaultAccount } from '@global/contexts/AccountProvider'
import DeleteUserJSON from '@global/types/httpClient/user/DeleteUser'
import deleteAccount from './deleteUser'

interface DeleteUserProps {
  setError: (error: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function useDeleteUser Handles the delete user mutation
 * @param props The setError function and navigation object
 * @param props.setError The function to set the error
 * @param props.navigation The navigation object
 * @returns The mutation object
 */
export default function useDeleteUser({ setError, navigation }: DeleteUserProps) {
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
        navigation.popToTop()
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
