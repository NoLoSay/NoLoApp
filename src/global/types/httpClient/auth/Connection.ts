type ConnectJSON = {
  json: {
    id: number
    uuid: string
    username: string
    email: string
    picture: string | null
    telNumber: string | null
    role: string
    accessToken: string
    createdAt: string
  }
  status: number
  message: string
}

export default ConnectJSON
