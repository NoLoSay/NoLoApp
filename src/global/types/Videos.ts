// eslint-disable-next-line no-shadow
export enum VideoValidationStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export type Video = {
  id: string
  artWorkName: string
  artWorkImage: string
  placeName: string
  validationStatus: VideoValidationStatus
  videoDuration: number
}
