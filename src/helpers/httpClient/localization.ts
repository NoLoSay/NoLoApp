import { GEOAPIFY_API_KEY } from '@env'
import { get } from './common'

type GeoCodeJSON = {
  type: string
  version: string
  features: {
    type: string
    geometry: {
      type: string
      coordinates: [number, number]
    }
    properties: {
      label: string
      score: number
      id: string
      name: string
      postcode: string
      citycode: string
      x: number
      y: number
      city: string
      context: string
      type: string
      importance: number
      street: string
      distance: number
    }
  }[]
  attribution: string
  licence: string
  filters: {
    type: string
  }
  center: [number, number]
  limit: number
}

async function getCityUsingGeoapify({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}): Promise<GeoCodeJSON> {
  try {
    const response = await get({
      url: 'https://api.geoapify.com',
      endpoint: `/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`,
    })

    return response.json()
  } catch (error) {
    console.error('Error in getCityUsingGeoapify:', error)
    throw error
  }
}

async function getCityUsingGouv({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}): Promise<GeoCodeJSON> {
  try {
    const response = await get({
      url: 'https://api-adresse.data.gouv.fr',
      endpoint: `/reverse/?lon=${longitude}&lat=${latitude}`,
    })

    return response.json()
  } catch (error) {
    console.error('Error in getCityUsingGouv:', error)
    throw error
  }
}

export default async function getCity({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}): Promise<string> {
  try {
    const gouvResponse = await getCityUsingGouv({ latitude, longitude })

    if (gouvResponse.features?.length === 0) {
      console.log('Unable to get data from gouv, trying with GeoApify')
      const geoResponse = await getCityUsingGeoapify({ latitude, longitude })

      return geoResponse.features[0]?.properties.city || ''
    }
    return gouvResponse.features[0]?.properties.city || ''
  } catch (error) {
    console.error('Error in getCity:', error)
    return ''
  }

  return ''
}
