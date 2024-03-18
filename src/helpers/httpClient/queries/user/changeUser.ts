import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'
import { put } from '@helpers/httpClient/common'

type ChangeUserProps = {
  username: string
  userId: number
  email: string
  authToken: string
}

/**
 * @function connect Send the user's email and password to the server to connect them to the app.
 * @param param Object containing the url, email, username, password, and headers.
 * @param param.url The url to send the request to.
 * @param param.username The user's username.
 * @param param.password The user's password.
 * @param param.headers The headers to send with the request.
 * @returns Promise of a Response object
 */
export default async function changeUser({
  username,
  userId,
  email,
  authToken,
}: ChangeUserProps): Promise<ChangeUserJSON> {
  try {
    const response = await put({
      endpoint: `/${userId}`,
      body: JSON.stringify({
        username,
        email,
      }),
      authorizationToken: authToken,
    })

    const responseData = await JSON.parse(JSON.stringify(response))

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
