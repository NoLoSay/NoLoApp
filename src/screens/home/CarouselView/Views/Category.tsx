/**
 * @fileoverview Category View
 * @module Category
 * @description Component that renders a category view, it is used to order what the user sees.
 * @requires react react-native
 * @requires ScrollView react-native
 * @requires RefreshControl react-native
 */

import React from 'react'
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Place, PlaceTag } from '@global/types/Places'
import ImageLoader from '@components/ImageLoader'
import CategorySeparator from './CategorySeparator'
import images from '@global/images'

interface Props {
  text: string
  places: Place[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function Category
 * @description Component that renders a category view.
 * @param text Title of the category
 * @param places Places to display in the category
 * @param navigation Navigation object
 * @returns {React.JSX.Element}
 */
export default function Category({ text, places, navigation }: Props): React.JSX.Element {
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

  return (
    <View style={styles.container}>
      <CategorySeparator text={text} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ overflow: 'visible' }}
      >
        {places.map((item: Place) => (
          <View
            style={styles.categoryContainer}
            key={item.id}
          >
            <TouchableOpacity onPress={() => navigation.navigate('PlaceDescription', { place: item })}>
              <ImageLoader
                imageURL={item.picture}
                imageStyle={{
                  width: 280,
                  height: 280,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 8, paddingTop: 4, flexDirection: 'column' }}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemAddressText}>
                {item.address.houseNumber} {item.address.street}, {item.address.city.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {item.tags.map(tag => (
                  <Image
                    key={tag}
                    source={getImageForTag(tag)()}
                    style={styles.tagIcon}
                  />
                ))}
              </View>
            </View>
          </View>
        ))}
        {places.length === 0 && <Text style={styles.itemText}>Aucun lieu trouvé</Text>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  itemAddressText: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontWeight: '300',
    marginVertical: 6,
  },
  categoryContainer: {
    flexDirection: 'column',
    marginRight: 16,
  },
  tagIcon: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
})
