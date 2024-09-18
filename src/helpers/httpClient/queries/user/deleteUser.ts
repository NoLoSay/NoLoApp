/**
 * @fileoverview deleteAccount function, used to delete the user's account.
 * @module deleteAccount
 */
import DeleteUserJSON from '@global/types/httpClient/user/DeleteUser'
import { deleteRequest } from '@helpers/httpClient/common'

type DeleteAccountProps = {
  userId: number
  accessToken: string
}

/**
 * @function deleteAccount Send the user's id and access token to the server to delete the user's account.
 * @param param Object containing the user's id and access token.
 * @param param.userId The user's id.
 * @param param.accessToken The user's access token.
 * @returns Promise of a DeleteUserJSON object
 */
export default async function deleteAccount({ userId, accessToken }: DeleteAccountProps): Promise<DeleteUserJSON> {
  const response = await deleteRequest({
    endpoint: `/users/${userId}`,
    authorizationToken: accessToken,
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message)
  }

  return {
    status: response.status,
    message: responseData.message,
  }
}
