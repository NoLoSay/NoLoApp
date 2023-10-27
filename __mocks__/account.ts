import { AccountType } from '@source/global/types/Account'

const defaultUser: AccountType = {
  accountID: 1,
  email: 'toto@tata.com',
  username: 'toto',
  phoneNumber: '+330612345678',
  accessToken: '123456789',
  localisation: {
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: 10,
      accuracy: 1,
      altitudeAccuracy: 1,
      heading: 2,
      speed: 232,
    },
    timestamp: 12729024,
  },
}

export default defaultUser
