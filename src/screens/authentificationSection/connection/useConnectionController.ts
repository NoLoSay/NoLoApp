import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { AuthStackParamList } from '@source/global/types/screensProps/AuthStackParams'
import { useState } from 'react'

interface ConnectionController {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
  connect: () => void
  forgotPassword: () => void
}

interface useConnectionControllerProps {
  navigation: any
}

export default function useConnectionController({ navigation }: useConnectionControllerProps): ConnectionController {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  function connect() {
    console.log('connect', email, password)
    navigation.navigate('AppRouter')
  }

  function forgotPassword() {
    console.log('forgotPassword', email)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    connect,
    forgotPassword,
  }
}
