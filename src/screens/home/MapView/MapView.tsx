import colors from '@source/global/colors'
import images from '@source/global/images'
import { Place } from '@source/global/types/Places'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import useMapViewController from './useMapViewController'

interface Props {
  places: Place[]
  navigation: any
}

export default function PlacesMapView({ places, navigation }: Props) {
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
      >
        {places.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinates}
            image={images.icons.maps.pin}
            onPress={() => onMarkerPress(marker)}
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
})
