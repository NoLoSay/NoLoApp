import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import { Place } from '@source/global/types/Places'
import { Ref, useContext, useRef } from 'react'
import { Alert } from 'react-native'
import MapView from 'react-native-maps'

interface MapViewController {
  account: AccountType
  mapRef: Ref<MapView>
  onMarkerPress: (place: Place) => void
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

  const goBackToUserLocation = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    mapRef.current?.animateToRegion(
      {
        latitude: account.localisation?.coords.latitude ?? 0.0,
        longitude: account.localisation?.coords.longitude ?? 0.0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      500
    )
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

  return {
    account,
    mapRef,
    onMarkerPress,
  }
}
