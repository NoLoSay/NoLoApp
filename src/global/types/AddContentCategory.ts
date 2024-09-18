/**
 * @fileoverview AddContentCategory interface
 * @module AddContentCategory
 * @description Interface for AddContentCategory.
 */
import { AccountElevationEnum } from './Account'

// eslint-disable-next-line no-shadow
export enum ContentCategoryId {
  ADDCONTENT = '1',
  LIBRARY = '2',
  COMMUNITY = '3',
}

/**
 * @typedef {Object} AddContentCategory
 * @property {ContentCategoryId} id - The id of the category.
 * @property {string} title - The title of the category.
 * @property {string} subtitle - The subtitle of the category.
 * @property {() => NodeRequire} icon - The icon of the category.
 * @property {AccountElevationEnum} elevation - The elevation of the category.
 */
export default interface AddContentCategory {
  id: ContentCategoryId
  title: string
  subtitle: string | null
  icon: () => NodeRequire
  elevation?: AccountElevationEnum
}
