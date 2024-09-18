/**
 * @fileoverview Videos type, used to define the response of the Videos request.
 * @module Videos
 * @description Typings for Videos response.
 */
import { AccountType } from '@global/types/Account'
import { ArtToTranslate } from '@global/types/Places'
import { VideoValidationStatus } from '@global/types/Videos'

/**
 * @typedef VideosJSON
 * @property {VideoLibrary[]} json - The videos object.
 * @property {number} status - The status of the response.
 * @property {string} message - The message of the response.
 */
export type VideosJSON = {
  json: VideoLibrary[]
  status: number
  message: string
}

/**
 * @typedef VideoLibrary
 * @property {number} id - The id of the video.
 * @property {string} uuid - The uuid of the video.
 * @property {number} duration - The duration of the video.
 * @property {string} externalProviderId - The external provider id of the video.
 * @property {Object[]} likeBy - The accounts that liked the video.
 * @property {Object} item - The item of the video.
 * @property {Object} postedBy - The account that posted the video.
 * @property {string} validationStatus - The validation status of the video.
 * @property {Date} createdAt - The creation date of the video.
 * @property {Date} updatedAt - The update date of the video.
 * @property {Date} deletedAt - The deletion date of the video.
 * @property {string} deletedReason - The deletion reason of the video.
 */
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

/**
 * @typedef ItemVideosJSON
 * @property {Object} json - The item object.
 * @property {number} json.id - The id of the item.
 * @property {string} json.name - The name of the item.
 * @property {string} json.description - The description of the item.
 * @property {string} json.picture - The picture of the item.
 * @property {Object} json.itemType - The type of the item.
 * @property {number} json.itemType.id - The id of the item type.
 * @property {string} json.itemType.name - The name of the item type.
 * @property {Object} json.itemType.itemCategory - The category of the item type.
 * @property {number} json.itemType.itemCategory.id - The id of the item category.
 * @property {string} json.itemType.itemCategory.name - The name of the item category.
 * @property {Object[]} json.videos - The videos of the item.
 * @property {number} json.videos.id - The id of the video.
 * @property {string} json.videos.createdAt - The creation date of the video.
 * @property {number} json.videos.duration - The duration of the video.
 * @property {number} json.videos.hostingProviderId - The hosting provider id of the video.
 * @property {string} json.videos.hostingProviderVideoId - The hosting provider video id of the video.
 * @property {Object[]} json.videos.likedBy - The accounts that liked the video.
 * @property {Object} json.videos.postedBy - The account that posted the video.
 * @property {string} json.videos.uuid - The uuid of the video.
 * @property {string} json.videos.validationStatus - The validation status of the video.
 * @property {number} status - The status of the response.
 * @property {string} message - The message of the response.
 */
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
