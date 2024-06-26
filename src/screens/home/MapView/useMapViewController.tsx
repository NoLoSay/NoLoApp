/**
 * @fileoverview Map view controller.
 * @module useMapViewController
 * @description Controller for the map view, it handles all the logic related to the map view component.
 * @requires react react-native
 * @requires MapView react-native-maps
 */
import { Ref, useContext, useRef } from 'react'
import { Alert } from 'react-native'
import MapView from 'react-native-maps'
import { AccountContext } from '@global/contexts/AccountProvider'
import { AccountType } from '@global/types/Account'
import { Place } from '@global/types/Places'

interface MapViewController {
  account: AccountType
  mapRef: Ref<MapView>
  onMarkerPress: (place: Place) => void
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function useMapViewController
 * @description Controller that handles the logic for the map view.
 * @param navigation Navigation object
 * @returns {MapViewController} Map view controller.
 */
export default function useMapViewController({ navigation }: Props): MapViewController {
  const mapRef = useRef(null)
  const { account } = useContext(AccountContext)

  /**
   * @function navigateToPlaceDescription
   * @description Navigates to the place description screen.
   * @param place Place to display
   */
  const navigateToPlaceDescription = (place: Place): void => {
    navigation.navigate('PlaceDescription', { place })
  }

  /**
   * @function onMarkerPress
   * @description Handles the marker press event.
   * @param place Place to display
   */
  function onMarkerPress(place: Place): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    mapRef.current?.animateToRegion(
      {
        latitude: place.address.latitude,
        longitude: place.address.longitude,
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
