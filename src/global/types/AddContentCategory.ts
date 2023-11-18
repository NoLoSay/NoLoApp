import { AccountElevationEnum } from './Account'

// eslint-disable-next-line no-shadow
export enum ContentCategoryId {
  ADDCONTENT = '1',
  LIBRARY = '2',
  COMMUNITY = '3',
}

export default interface AddContentCategory {
  id: ContentCategoryId
  title: string
  subtitle: string | null
  icon: () => NodeRequire
  elevation?: AccountElevationEnum
}
