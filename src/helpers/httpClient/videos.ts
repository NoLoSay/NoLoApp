/**
 * @fileoverview Video related helper functions.
 * @module videos
 * @description Helper functions for videos.
 */

import VideosJSON, { ItemVideosJSON } from '@global/types/httpClient/queries/videos'
import { DEV_VIDEO_API_URL, PROD_VIDEO_API_URL } from '@env'
import RNFetchBlob from 'rn-fetch-blob'
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

type GetItemVideoProps = {
  itemId: string
  token: string
}

export async function getItemVideo({ itemId, token }: GetItemVideoProps): Promise<ItemVideosJSON> {
  const res = await get({
    endpoint: `/items/${itemId}`,
    authorizationToken: token,
  })

  if (!res.ok) {
    console.log('Error getting video info')
    throw new Error(res.statusText)
  }

  const response = await res.json()

  return {
    json: response,
    status: res.status,
    message: res.statusText,
  }
}

type SendTranslationVideoParams = {
  artworkId: string
  token: string
  filename: string
  uri: string
}

export async function sendTranslationVideo({
  artworkId,
  token,
  filename,
  uri,
}: SendTranslationVideoParams): Promise<number> {
  const response = await RNFetchBlob.fetch(
    'POST',
    `${__DEV__ ? DEV_VIDEO_API_URL : PROD_VIDEO_API_URL}/upload/${artworkId}`,
    {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    [
      {
        name: 'file',
        filename,
        data: JSON.stringify({
          file: RNFetchBlob.wrap(uri),
        }),
      },
    ]
  )

  return response.respInfo.status
}
