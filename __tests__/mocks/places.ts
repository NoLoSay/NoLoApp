import { Place, PlaceType, PlaceTag } from '@global/types/Places'

export const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Museum A',
    shortDescription: 'Short description',
    longDescription: 'Long description',
    pictures: [],
    address: {
      id: 1,
      houseNumber: '1',
      street: 'Main St',
      zip: '12345',
      city: {
        id: 1,
        name: 'City A',
        zip: '12345',
        department: {
          id: 1,
          name: 'Department A',
          country: {
            id: 1,
            name: 'Country A',
          },
        },
      },
      otherDetails: '',
      latitude: 40.712776,
      longitude: -74.005974,
    },
    telNumber: '1234567890',
    email: 'email@example.com',
    website: 'http://example.com',
    type: PlaceType.MUSEUM,
    price: 10,
    tags: [PlaceTag.DISABILITY_FRIENDLY],
  },
  {
    id: 2,
    name: 'Library B',
    shortDescription: 'Short description',
    longDescription: 'Long description',
    pictures: [],
    address: {
      id: 2,
      houseNumber: '2',
      street: 'Second St',
      zip: '54321',
      city: {
        id: 2,
        name: 'City B',
        zip: '54321',
        department: {
          id: 2,
          name: 'Department B',
          country: {
            id: 2,
            name: 'Country B',
          },
        },
      },
      otherDetails: '',
      latitude: 40.73061,
      longitude: -73.935242,
    },
    telNumber: '9876543210',
    email: 'email2@example.com',
    website: 'http://example2.com',
    type: PlaceType.LIBRARY,
    price: 5,
    tags: [PlaceTag.BLIND_FRIENDLY],
  },
  // Add more mock places as needed
]
