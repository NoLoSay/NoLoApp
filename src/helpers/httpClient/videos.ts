/**
 * @fileoverview Video related helper functions.
 * @module videos
 * @description Helper functions for videos.
 */

import VideosJSON from '@global/types/httpClient/queries/videos'
import { get } from './common'

type GetUserVideosParams = {
  userId: number
  token: string
}

export default async function getUserVideos({ userId, token }: GetUserVideosParams): Promise<VideosJSON> {
  try {
    const response = await get({ endpoint: `/users/${userId}/videos`, authorizationToken: token })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const responseData = await response.json()

    return {
      json: responseData,
      status: response.status,
      message: response.statusText,
    }
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err))
  }
}
