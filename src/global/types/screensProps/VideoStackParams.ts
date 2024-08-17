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
  VideoScreen: undefined
  PlacesNeedingTranslation: undefined
  PlaceArtsPiecesScreen: undefined
  TextScreen: undefined
  LibraryScreen: undefined
}

/**
 * @typedef {Object} SubscriptionScreenProps
 */
export type VideoScreenProps = NativeStackScreenProps<VideoStackParamList, 'VideoScreen'>
export type PlacesNeedingDescriptionScreenProps = NativeStackScreenProps<
  VideoStackParamList,
  'PlacesNeedingTranslation'
>
export type PlaceArtsPiecesScreenProps = NativeStackScreenProps<VideoStackParamList, 'PlaceArtsPiecesScreen'>
export type TextScreenProps = NativeStackScreenProps<VideoStackParamList, 'TextScreen'>
export type LibraryScreenProps = NativeStackScreenProps<VideoStackParamList, 'LibraryScreen'>
