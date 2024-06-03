// eslint-disable-next-line no-shadow
export enum VideoValidationStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

export type Video = {
  id: string
  artWorkName: string
  artWorkImage: string
  placeName: string
  validationStatus: VideoValidationStatus
  videoDuration: number
}
