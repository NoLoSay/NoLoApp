import { GeolocationResponse } from '@global/types/Account'
import { Place } from '@global/types/Places'

/**
 * @function orderAndFilterPlacesByLocation
 * @description Get the nearest places from the user with a calculation of the distance
 * @param {GeolocationResponse} accountLocation The user's location
 * @param {Place[]} places The list of places
 * @returns {Place[]} The 10 nearest places
 */
export function orderAndFilterPlacesByLocation(
  accountLocation: GeolocationResponse | undefined,
  places: Place[]
): Place[] {
  let localisation = {
    latitude: 0,
    longitude: 0,
  }
  if (accountLocation) localisation = accountLocation.coords
  const placesBis = [...places]

  const placesOrderedByDistance = placesBis.sort((a, b) => {
    const distanceA = Math.sqrt(
      (a.address.latitude - localisation.latitude) ** 2 + (a.address.longitude - localisation.longitude) ** 2
    )
    const distanceB = Math.sqrt(
      (b.address.latitude - localisation.latitude) ** 2 + (b.address.longitude - localisation.longitude) ** 2
    )

    return distanceA - distanceB
  })
  return placesOrderedByDistance.slice(0, 10)
}
