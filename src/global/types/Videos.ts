/**
 * @fileoverview Videos type, used to define the response of the Videos request.
 * @module Videos
 * @description Typings for Videos response.
 */

/**
 * @typedef {Object} VideoValidationStatus
 * @property {string} Pending - The video is pending validation.
 * @property {string} Approved - The video is approved.
 * @property {string} Rejected - The video is rejected.
 */
// eslint-disable-next-line no-shadow
export enum VideoValidationStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

/**
 * @typedef {Object} Video
 * @property {string} id - The id of the video.
 * @property {string} artWorkName - The name of the artwork.
 * @property {string} artWorkImage - The image of the artwork.
 * @property {string} placeName - The name of the place.
 * @property {VideoValidationStatus} validationStatus - The validation status of the video.
 * @property {number} videoDuration - The duration of the video.
 */
export type Video = {
  id: string
  artWorkName: string
  artWorkImage: string
  placeName: string
  validationStatus: VideoValidationStatus
  videoDuration: number
}
