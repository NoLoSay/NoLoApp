import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'
import { put } from '@helpers/httpClient/common'

type ChangeUserProps = {
  username: string
  userId: number
  email: string
  phoneNumber: string
  authToken: string
}

/**
 * @function changeUser Send the user's email, username, and password to the server to change the user's information.
 * @param param Object containing the email, username, password, and headers.
 * @param param.username The user's username.
 * @param param.userId The user's id.
 * @param param.email The user's email.
 * @param param.phoneNumber The user's phone number.
 * @param param.authToken The user's auth token.
 * @returns Promise of a Response object
 */
export default async function changeUser({
  username,
  userId,
  email,
  phoneNumber,
  authToken,
}: ChangeUserProps): Promise<ChangeUserJSON> {
  try {
    const response = await put({
      endpoint: `/users/${userId}`,
      body: JSON.stringify({
        username,
        email,
        telNumber: phoneNumber,
      }),
      authorizationToken: authToken,
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    return {
      json: responseData,
      status: response.status,
      message: responseData.message,
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}
