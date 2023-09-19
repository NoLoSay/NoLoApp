import images from '@source/global/images'
import { AccountType } from '@source/global/types/Account'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

interface Props {
  account: AccountType
}

export default function PlacesMapView({ account }: Props) {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: account.localisation?.coords.latitude ?? 0.0,
          longitude: account.localisation?.coords.longitude ?? 0.0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: account.localisation?.coords.latitude ?? 0.0,
            longitude: account.localisation?.coords.longitude ?? 0.0,
          }}
          image={images.icons.maps.marker}
        />
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
})
