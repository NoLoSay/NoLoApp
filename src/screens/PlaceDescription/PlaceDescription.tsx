/**
 * @fileoverview PlaceDescription component
 * @module PlaceDescription
 * @description PlaceDescription screen, it will be used to display information about a place
 * @requires react react-native
 */

import React from 'react'
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Button from '@components/Button'
import images from '@global/images'
import { Place, PlaceTag } from '@global/types/Places'
import { colors } from '@global/colors'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation: any = useNavigation()

  const getImageForTag = (tag: PlaceTag): (() => ImageSourcePropType) => {
    switch (tag) {
      case PlaceTag.BLIND_FRIENDLY:
        return images.icons.outline.blind
      case PlaceTag.DEAF_FRIENDLY:
        return images.icons.outline.deaf
      case PlaceTag.DISABILITY_FRIENDLY:
        return images.icons.outline.disabled
      case PlaceTag.OTHER:
        return images.icons.outline.other
      default:
        return images.logos.heart
    }
  }

  const getTextForTag = (tag: PlaceTag): string => {
    switch (tag) {
      case PlaceTag.BLIND_FRIENDLY:
        return 'blind'
      case PlaceTag.DEAF_FRIENDLY:
        return 'deaf'
      case PlaceTag.DISABILITY_FRIENDLY:
        return 'disabled'
      case PlaceTag.OTHER:
        return 'other'
      default:
        return 'nolosay'
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.icons.outline.cross()}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{place?.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <FastImage
          source={{
            uri: place?.pictures[0]?.hostingUrl,
            priority: FastImage.priority.high,
          }}
          style={styles.image}
          accessibilityLabel={`Image of ${place?.name}`}
        />
        <View style={styles.iconsContainer}>
          {place?.tags.map(tag => (
            <View
              key={tag}
              style={{ marginLeft: 8 }}
            >
              <Image
                key={tag}
                source={getImageForTag(tag)()}
                style={styles.tagIcon}
                accessibilityLabel={`tag ${getTextForTag(tag)}`}
              />
            </View>
          ))}
        </View>
      </View>
      <ScrollView>
        <Text style={styles.descriptionText}>{place?.longDescription}</Text>
        <Button
          text='En savoir plus'
          style={{ marginHorizontal: 32 }}
          onPress={() => navigation.navigate('WebViewModal', { uri: place?.website, name: place?.name })}
        />
      </ScrollView>
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
    borderRadius: 20,
  },
  imageContainer: {
    marginTop: 16,
    paddingHorizontal: 12,
    width: '100%',
  },
  iconsContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tagIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  descriptionText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify',
    color: colors.black,
    paddingHorizontal: 28,
    marginBottom: 16,
  },
})
