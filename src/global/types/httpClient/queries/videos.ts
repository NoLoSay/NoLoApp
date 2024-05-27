import { AccountType } from '@global/types/Account'
import { ArtToTranslate } from '@global/types/Places'
import { VideoValidationStatus } from '@global/types/Videos'

export type VideosJSON = {
  json: VideoLibrary[]
  status: number
  message: string
}

export type VideoLibrary = {
  id: number
  uuid: string
  duration: number
  externalProviderId: string
  likeBy: AccountType[]
  item: ArtToTranslate
  postedBy: AccountType
  validationStatus: VideoValidationStatus
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  deletedReason?: string
}

export type ItemVideosJSON = {
  json: {
    id: number
    name: string
    description: string
    picture: string
    itemType: {
      id: number
      name: string
      itemCategory: {
        id: number
        name: string
      }
    }
    videos: {
      id: number
      createdAt: string
      duration: number
      hostingProviderId: number
      hostingProviderVideoId: string
      likedBy: AccountType[]
      postedBy: AccountType
      uuid: string
      validationStatus: VideoValidationStatus
    }[]
  }
  status: number
  message: string
}

export default VideosJSON

// id: number = 0
// uuid: string = ''
// duration: number = 0
// externalProviderId: string = ''
// createdAt: Date = new Date()
// likedBy: User[] = []
// item: Item | undefined = undefined
// postedBy: User | undefined = undefined
