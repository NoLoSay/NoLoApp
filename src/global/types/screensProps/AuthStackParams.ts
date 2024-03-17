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
  ForgotPassword: undefined
  VerifyEmail: undefined
  AppRouter: undefined
  SettingsModal: undefined
  WebViewModal: React.JSX.Element
  PlaceDescription: React.JSX.Element
  VideoConsumptionModal: React.JSX.Element
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
 * @typedef {Object} ForgotPasswordScreenProps
 */
export type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>

export type VerifyEmailScreenProps = NativeStackScreenProps<AuthStackParamList, 'VerifyEmail'>

/**
 * @typedef {Object} AppRouterScreenProps
 */
export type AppRouterScreenProps = NativeStackScreenProps<AuthStackParamList, 'AppRouter'>

/**
 * @typedef {Object} SettingsModalScreenProps
 */
export type SettingsModalScreenProps = NativeStackScreenProps<AuthStackParamList, 'SettingsModal'>

/**
 * @typedef {Object} WebViewModalScreenProps
 */
export type WebViewModalScreenProps = NativeStackScreenProps<AuthStackParamList, 'WebViewModal'>

/**
 * @typedef {Object} PlaceDescriptionScreenProps
 */
export type PlaceDescriptionScreenProps = NativeStackScreenProps<AuthStackParamList, 'PlaceDescription'>

/**
 * @typedef {Object} VideoConsumptionModalProps
 */
export type VideoConsumptionModalProps = NativeStackScreenProps<AuthStackParamList, 'VideoConsumptionModal'>
