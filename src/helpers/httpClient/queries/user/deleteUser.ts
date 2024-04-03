import DeleteUserJSON from '@global/types/httpClient/user/DeleteUser'
import { deleteRequest } from '@helpers/httpClient/common'

type DeleteAccountProps = {
  userId: number
  accessToken: string
}

export default async function deleteAccount({ userId, accessToken }: DeleteAccountProps): Promise<DeleteUserJSON> {
  const response = await deleteRequest({
    endpoint: `/users/${userId}`,
    body: JSON.stringify({}),
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
