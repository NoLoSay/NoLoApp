import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'

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
  const responseStatus = Math.floor(Math.random() * 2 + 1)
  await new Promise(resolve => {
    setTimeout(() => {
      console.log('Change User')
      resolve(responseStatus === 1 ? 201 : 400)
    }, 2000)
  })

  if (responseStatus === 1) {
    console.log('|-> Success')
    return {
      json: {
        username,
        email,
        phoneNumber,
      },
      status: 201,
      message: 'User changed',
    }
  }
  throw new Error('Erreur Serveur')
  // try {
  //   const response = await put({
  //     endpoint: `/${userId}`,
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       phoneNumber,
  //     }),
  //     authorizationToken: authToken,
  //   })

  //   const responseData = await JSON.parse(JSON.stringify(response))

  //   if (!response.ok) {
  //     throw new Error(responseData.message)
  //   }

  //   return {
  //     json: responseData,
  //     status: response.status,
  //     message: responseData.message,
  //   }
  // } catch (error) {
  //   throw new Error(error instanceof Error ? error.message : String(error))
  // }
}
