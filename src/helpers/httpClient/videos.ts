/**
 * @fileoverview Video related helper functions.
 * @module videos
 * @description Helper functions for videos.
 */

import VideosJSON from '@source/global/types/httpClient/queries/videos'
import { Video, VideoValidationStatus } from '../../global/types/Videos'

type GetUserVideosParams = {
  userId: number
}

const VIDEOS: Video[] = [
  {
    id: '1',
    artWorkName: 'La tapisserie de Charles X',
    artWorkImage: 'https://collections.louvre.fr/media/cache/medium/0000000021/0000101500/0000793562_OG.JPG',
    placeName: 'Château des ducs de Bretagne',
    validationStatus: VideoValidationStatus.Approved,
    videoDuration: 140,
  },
  {
    id: '2',
    artWorkName: 'Château sur bois',
    artWorkImage: 'https://media.paperblog.fr/i/580/5808387/nantes-L-BoeJzB.jpeg',
    placeName: 'Château des ducs de Bretagne',
    validationStatus: VideoValidationStatus.Pending,
    videoDuration: 120,
  },
]

// Remove this line when the function is implemented
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getUserVideos({ userId }: GetUserVideosParams) {
  return new Promise<VideosJSON>(resolve => {
    setTimeout(() => {
      resolve({
        json: VIDEOS,
        status: 200,
        message: 'Success',
      })
    }, 500)
  })
}
