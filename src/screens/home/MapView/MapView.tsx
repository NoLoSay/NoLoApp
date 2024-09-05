/**
 * @fileoverview Map View component
 * @module MapView
 * @description Component that renders the map view, it allows users to see places directly on the map.
 * @requires react react-native
 * @requires MapView react-native-maps
 * @requires Marker react-native-maps
 */

import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import colors from '@global/colors'
import images from '@global/images'
import { Place } from '@global/types/Places'
import useMapViewController from './useMapViewController'

interface Props {
  places: Place[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function PlacesMapView
 * @param places Places to display on the map
 * @param navigation Navigation object
 * @returns {JSX.Element}
 */
export default function PlacesMapView({ places, navigation }: Props): JSX.Element {
  const { account, onMarkerPress, mapRef } = useMapViewController({ navigation })

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: account.localisation?.coords.latitude ?? 0.0,
          longitude: account.localisation?.coords.longitude ?? 0.0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        style={styles.map}
        showsUserLocation
        loadingEnabled
        loadingIndicatorColor={colors.accent}
        loadingBackgroundColor={colors.lightGrey}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      >
        {places.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ longitude: marker.address.longitude, latitude: marker.address.latitude }}
            image={images.icons.maps.pin()}
            onPress={() => onMarkerPress(marker)}
            // @ts-expect-error - n
            height={150}
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  map: {
    flex: 1,
    borderRadius: 20,
  },
  boxContainer: {
    width: 'auto',
    height: 'auto',
    borderRadius: 20,
    backgroundColor: '#CECECE',
    opacity: 0.86,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  boxDescription: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 12,
  },
  errorText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
