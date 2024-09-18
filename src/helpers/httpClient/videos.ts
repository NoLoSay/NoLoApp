/**
 * @fileoverview Video related helper functions.
 * @module videos
 * @description Helper functions for videos.
 */

import VideosJSON, { ItemVideosJSON } from '@global/types/httpClient/queries/videos'
import { VIDEO_API_URL } from '@env'
import { get } from './common'

type GetUserVideosParams = {
  userId: number
  token: string
}

/**
 * @function getUserVideos Get the videos of a user.
 * @param props The user id and token.
 * @param props.userId The user id.
 * @param props.token The token.
 * @returns Promise of a VideosJSON object
 */
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

/**
 * @function getItemVideo Get the video of an item.
 * @param props The item id and token.
 * @param props.itemId The item id.
 * @param props.token The token.
 * @returns Promise of an ItemVideosJSON object
 */
export async function getItemVideo({ itemId, token }: GetItemVideoProps): Promise<ItemVideosJSON> {
  const res = await get({
    endpoint: `/items/${itemId}`,
    authorizationToken: token,
  })

  if (!res.ok) {
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

/**
 * @function sendTranslationVideo Send a translation video.
 * @param props The artwork id, token, filename, and uri.
 * @param props.artworkId The artwork id.
 * @param props.token The token.
 * @param props.filename The filename.
 * @param props.uri The uri.
 * @returns Promise of a boolean
 */
export async function sendTranslationVideo({
  artworkId,
  token,
  filename,
  uri,
}: SendTranslationVideoParams): Promise<boolean> {
  const formData = new FormData()
  formData.append('file', {
    name: `${filename ?? 'video'}.mp4`,
    uri,
    type: 'video/mp4',
  })
  const response = await fetch(`${VIDEO_API_URL}/upload/${artworkId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  return response.ok
}
