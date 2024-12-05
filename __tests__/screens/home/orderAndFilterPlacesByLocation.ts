import { Place } from '@global/types/Places'
import { orderAndFilterPlacesByLocation } from '@screens/home/utils'
import { mockPlaces } from '../../mocks/places'
import { mockLocation } from '../../mocks/userLocation'

describe('orderAndFilterPlacesByLocation', () => {
  it('should return places ordered by distance to the given location', () => {
    const result = orderAndFilterPlacesByLocation(mockLocation, mockPlaces)

    expect(result).toHaveLength(2) // Assuming we only have 2 mock places
    expect(result[0].name).toBe('Museum A') // Closest place
    expect(result[1].name).toBe('Library B') // Second closest
  })

  it('should return only 10 places if more than 10 are provided', () => {
    const largeMockPlaces = Array.from({ length: 15 }, (_, i) => ({
      ...mockPlaces[0],
      id: i + 1,
      name: `Place ${i + 1}`,
    }))

    const result = orderAndFilterPlacesByLocation(mockLocation, largeMockPlaces)

    expect(result).toHaveLength(10) // Should limit to 10 places
  })

  it('should use default coordinates if location is undefined', () => {
    const result = orderAndFilterPlacesByLocation(undefined, mockPlaces)

    expect(result).toHaveLength(2) // All mock places
    expect(result[0].name).toBe('Library B')
    expect(result[1].name).toBe('Museum A')
  })

  it('should return an empty array if no places are provided', () => {
    const result = orderAndFilterPlacesByLocation(mockLocation, [])
    expect(result).toEqual([])
  })

  it('should handle edge cases with equal distances', () => {
    const mockEqualDistancePlaces: Place[] = [
      {
        ...mockPlaces[0],
        name: 'Place 1',
        address: {
          ...mockPlaces[0].address,
          latitude: 40.712776,
          longitude: -74.005974,
        },
      },
      {
        ...mockPlaces[1],
        name: 'Place 2',
        address: {
          ...mockPlaces[1].address,
          latitude: 40.712776,
          longitude: -74.005974,
        },
      },
    ]

    const result = orderAndFilterPlacesByLocation(mockLocation, mockEqualDistancePlaces)

    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Place 1')
    expect(result[1].name).toBe('Place 2')
  })
})
