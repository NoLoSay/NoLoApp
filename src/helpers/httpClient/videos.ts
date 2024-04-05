/**
 * @fileoverview Video related helper functions.
 * @module videos
 * @description Helper functions for videos.
 */

import VideosJSON, { VideoLibrary } from '@global/types/httpClient/queries/videos'
import { defaultAccount } from '@global/contexts/AccountProvider'
import { VideoValidationStatus } from '@global/types/Videos'
import { get } from './common'

type GetUserVideosParams = {
  userId: number
  token: string
}

const ItemType = {
  id: 1,
  name: 'Castle',
  ItemCategory: {
    id: 1,
    name: 'Historical',
  },
}

const VIDEOS: VideoLibrary[] = [
  {
    id: 1,
    uuid: 'f1208994-8525-5268-9e86-144120f2e23a',
    duration: 140,
    externalProviderId: 'f1208994-8525-5268-9e86-144120f2e23a',
    likeBy: [],
    item: {
      id: '1',
      uuid: '88d3bb9e-c9dd-58f8-b0ef-63b4195b4255',
      name: 'Château de Versailles',
      description: 'None',
      picture: 'https://www.unjourdeplusaparis.com/wp-content/uploads/2019/03/chateau-de-versailles.jpg',
      RelatedPerson: null,
      ItemType,
    },
    postedBy: defaultAccount,
    createdAt: new Date(),
    validationStatus: VideoValidationStatus.Approved,
  },
  {
    id: 1,
    uuid: 'f1208994-8525-5268-9e86-144120f2e23a',
    duration: 140,
    externalProviderId: 'f1208994-8525-5268-9e86-144120f2e23a',
    likeBy: [],
    item: {
      id: '1',
      uuid: '88d3bb9e-c9dd-58f8-b0ef-63b4195b4255',
      name: 'Château des Ducs de Bretagne',
      description: 'None',
      picture:
        'https://www.chateaunantes.fr/wp-content/uploads/2020/09/Chateau-des-ducs-de-Bretagne.-Nantes-©-Philippe-Piron-_-LVAN-2-768x614.jpg',
      RelatedPerson: null,
      ItemType,
    },
    postedBy: defaultAccount,
    createdAt: new Date(),
    deleteAt: new Date(),
    deleteReason: 'Content not appropriate',
    validationStatus: VideoValidationStatus.Rejected,
  },
]

export default async function getUserVideos({ userId, token }: GetUserVideosParams): Promise<VideosJSON> {
  try {
    const response = await get({ endpoint: `/items/${userId}/videos`, authorizationToken: token })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const responseData = await response.json()

    if (responseData.length === 0 && __DEV__) {
      return {
        json: VIDEOS,
        status: response.status,
        message: response.statusText,
      }
    }

    return {
      json: {
        ...responseData,
        createdAt: new Date(responseData.createdAt),
        updatedAt: responseData.updatedAt ? new Date(responseData.updatedAt) : undefined,
        deleteAt: responseData.deleteAt ? new Date(responseData.deleteAt) : undefined,
      },
      status: response.status,
      message: response.statusText,
    }
  } catch (err) {
    console.error(err)
    throw new Error(err instanceof Error ? err.message : String(err))
  }
}
