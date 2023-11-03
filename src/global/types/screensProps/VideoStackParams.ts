/**
 * @fileoverview VideoStackParams typescript type definitions, used to type the props of the screens of the VideoStack.
 * @module VideoStackParams
 * @description Type definitions for the VideoStackParams.
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack'

/**
 * @typedef {Object} VideoStackParamList
 * @property {undefined} ActionsScreen
 */
export type VideoStackParamList = {
  ActionsScreen: undefined
}

/**
 * @typedef {Object} SubscriptionScreenProps
 */
export type ListElementScreenProps = NativeStackScreenProps<VideoStackParamList, 'ActionsScreen'>
