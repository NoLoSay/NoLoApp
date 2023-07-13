import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type AuthStackParamList = {
  Subscription: undefined
  Connection: undefined
  AppRouter: undefined
}

export type SubscriptionScreenProps = NativeStackScreenProps<AuthStackParamList, 'Subscription'>
export type ConnectionScreenProps = NativeStackScreenProps<AuthStackParamList, 'Connection'>
export type AppRouterScreenProps = NativeStackScreenProps<AuthStackParamList, 'AppRouter'>
