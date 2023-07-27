/**
 * @fileoverview AuthStackParams typescript type definitions, used to type the props of the screens of the AuthStack.
 * @module AuthStackParams
 * @description Type definitions for the AuthStackParams.
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack'

/**
 * @typedef {Object} AuthStackParamList
 * @property {undefined} Subscription
 * @property {undefined} Connection
 * @property {undefined} AppRouter
 */
export type AuthStackParamList = {
  Subscription: undefined
  Connection: undefined
  AppRouter: undefined
}

/**
 * @typedef {Object} SubscriptionScreenProps
 */
export type SubscriptionScreenProps = NativeStackScreenProps<AuthStackParamList, 'Subscription'>

/**
 * @typedef {Object} ConnectionScreenProps
 */
export type ConnectionScreenProps = NativeStackScreenProps<AuthStackParamList, 'Connection'>

/**
 * @typedef {Object} AppRouterScreenProps
 */
export type AppRouterScreenProps = NativeStackScreenProps<AuthStackParamList, 'AppRouter'>
