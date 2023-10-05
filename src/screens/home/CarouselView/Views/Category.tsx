import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Place } from '@source/global/types/Places'
import CategorySeparator from './CategorySeparator'

interface Props {
  text: string
  places: Place[]
  navigation: any
}

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
              <FastImage
                source={{
                  uri: item.image,
                  priority: FastImage.priority.normal,
                }}
                style={styles.image}
              />
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
  image: {
    width: 96,
    height: 154,
    borderRadius: 20,
  },
  categoryContainer: {
    flexDirection: 'column',
    marginRight: 16,
  },
})
