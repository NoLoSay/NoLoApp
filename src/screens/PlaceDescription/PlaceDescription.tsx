/**
 * @fileoverview PlaceDescription component
 * @module PlaceDescription
 * @description PlaceDescription screen, it will be used to display information about a place
 * @requires react react-native
 */

import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@global/colors'
import { Place } from '@source/global/types/Places'
import { RouteProp, useNavigation } from '@react-navigation/native'
import Button from '@source/components/Button'
import images from '@source/global/images'
import FastImage from 'react-native-fast-image'

type AuthStackParamList = {
  WebViewModal: { place?: Place } // Make 'uri' optional as a route parameter
}

type PlaceDescriptionScreenRouteProp = RouteProp<AuthStackParamList, 'WebViewModal'>

interface PlaceDescriptionProps {
  route: PlaceDescriptionScreenRouteProp
}

/**
 * @function PlaceDescription
 * @description Component that renders the PlaceDescription.
 * @returns {React.JSX.Element} App component template
 */
export default function PlaceDescription({ route }: PlaceDescriptionProps): React.JSX.Element {
  const { place } = route.params
  const navigation: any = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.icons.outline.cross}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{place?.name}</Text>
      </View>
      <FastImage
        source={{
          uri: place?.image,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
      />
      <Text>{place?.name}</Text>
      <Button
        onPress={() => navigation.goBack()}
        text='Go back'
      />
      <Button
        onPress={() => navigation.navigate('WebViewModal', { uri: place?.website, name: place?.name })}
        text='See more'
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.veryLightGrey,
    flex: 1,
  },
  topbar: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: colors.darkGrey,
  },
  loader: {
    position: 'absolute',
    top: '48%',
    left: '48%',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
})
