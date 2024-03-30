type ChangeUserJSON = {
  json: {
    username: string
    email: string
    phoneNumber: string
  }
  status: number
  message: string
}

export default ChangeUserJSON
