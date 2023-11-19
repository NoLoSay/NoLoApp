import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import { Place } from '@source/global/types/Places'
import { Ref, useContext, useRef } from 'react'
import { Alert, Platform } from 'react-native'
import MapView from 'react-native-maps'

interface MapViewController {
  account: AccountType
  mapRef: Ref<MapView>
  onMarkerPress: (place: Place) => void
  isMapAvailable: () => boolean
}

interface Props {
  navigation: any
}

export default function useMapViewController({ navigation }: Props): MapViewController {
  const mapRef = useRef(null)
  const { account } = useContext(AccountContext)

  const navigateToPlaceDescription = (place: Place) => {
    navigation.navigate('PlaceDescription', { place })
  }

  function onMarkerPress(place: Place) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    mapRef.current?.animateToRegion(
      {
        latitude: place.coordinates.latitude,
        longitude: place.coordinates.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      500
    )
    Alert.alert(place.name, place.shortDescription, [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Voir',
        onPress: () => navigateToPlaceDescription(place),
      },
    ])
  }

  const isMapAvailable = () => Platform.OS === 'ios' || Platform.OS === 'macos'

  return {
    account,
    mapRef,
    onMarkerPress,
    isMapAvailable,
  }
}
