/**
 * @fileoverview Category View
 * @module Category
 * @description Component that renders a category view, it is used to order what the user sees.
 * @requires react react-native
 * @requires ScrollView react-native
 * @requires RefreshControl react-native
 */

import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Place } from '@source/global/types/Places'
import CategorySeparator from './CategorySeparator'
import PlaceImage from './PlaceImage'

interface Props {
  text: string
  places: Place[]
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
              <PlaceImage item={item} />
            </TouchableOpacity>
            <Text style={styles.itemText}>
              {item.name.length > 13 ? `${item.name.substring(0, 13)}...` : item.name}
            </Text>
            <Text style={styles.itemText}>{item.city}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'column',
    marginRight: 16,
  },
})
