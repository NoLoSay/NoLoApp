/**
 * @fileoverview useChangePassword is a custom react hook that handles the change password mutation
 * @module useChangePassword
 * @description A custom hook that handles the change password mutation
 */

import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@helpers/httpClient/queries/auth/auth'
import ChangePasswordJSON from '@global/types/httpClient/auth/ChangePassword'

interface ChangePasswordUseProps {
  email: string
  newPassword: string
  setError: (error: string) => void
}

type ChangePasswordProps = {
  message: string
  status: number
}

/**
 * @function useChangePassword Handles the change password mutation
 * @param props The email, new password, and setError function
 * @param props.email The user's email
 * @param props.newPassword The user's new password
 * @param props.setError The function to set the error
 * @returns The mutation object
 */
export default function useChangePassword({ email, newPassword, setError }: ChangePasswordUseProps) {
  function handleResponse({ message, status }: ChangePasswordProps) {
    if (status !== 201) {
      setError(message)
    }
  }

  const mutation = useMutation<ChangePasswordJSON>({
    mutationFn: () => changePassword({ email, newPassword }),
    onSuccess: data => {
      try {
        handleResponse({
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
