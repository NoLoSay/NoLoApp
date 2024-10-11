/**
 * @fileoverview Places helper functions.
 * @module Places
 * @description Helper functions to get and handle places.
 */

import PlacesNeedingTranslationJSON, { NoloPlacesJSON } from '@global/types/httpClient/queries/places'
import { get } from './common'

/**
 * @function searchPlaces Search the places from the server.
 * @returns Promise of an array of places
 */
export default async function searchPlaces({
  latitude,
  longitude,
  q,
  radius,
  token,
}: {
  latitude?: number
  longitude?: number
  q?: string
  radius?: number
  token: string
}): Promise<NoloPlacesJSON> {
  try {
    const queryParams: { [key: string]: string } = {}

    if (latitude !== undefined) {
      queryParams.latitude = latitude.toString()
    }
    if (longitude !== undefined) {
      queryParams.longitude = longitude.toString()
    }
    if (radius !== undefined) {
      queryParams.radius = radius.toString()
    }
    if (q !== undefined) {
      queryParams.q = q
    }

    const queryString = new URLSearchParams(queryParams).toString()
    const endpoint = `search/sites${queryString ? `?${queryString}` : ''}`

    const response = await get({
      endpoint: `/${endpoint}`,
      authorizationToken: token,
    })

    const responseData = await response.json()

    console.log('searchPlaces response:', responseData)

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    return {
      json: responseData,
      status: response.status,
      message: responseData.message,
    }
  } catch (error) {
    console.log("Error, couldn't get places:", error)
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

/**
 * @function getPlaces Get the places from the server.
 * @returns Promise of an array of places
 */
export async function getPlaces({ token }: { token: string }): Promise<NoloPlacesJSON> {
  try {
    const response = await get({
      endpoint: `/sites`,
      authorizationToken: token,
    })

    const responseData = await response.json()

    console.log('getPlaces response:', responseData)

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    return {
      json: responseData,
      status: response.status,
      message: responseData.message,
    }
  } catch (error) {
    console.log("Error, couldn't get places:", error)
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

/**
 * @function getPlacesNeedingDescription Get the places that need a description.
 * @param props The user's token
 * @param props.token The user's token
 * @returns Promise of an array of places
 */
export async function getPlacesNeedingDescription({ token }: { token: string }): Promise<PlacesNeedingTranslationJSON> {
  try {
    const response = await get({ endpoint: '/items/video-pending', authorizationToken: token })

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
    console.error(err)
    throw new Error(err instanceof Error ? err.message : String(err))
  }
}
