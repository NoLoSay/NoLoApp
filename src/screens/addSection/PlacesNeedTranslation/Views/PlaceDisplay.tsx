/**
 * @fileoverview Component that renders a place on the needing translation list screen
 * @module PlaceDisplay
 * @requires react react-native
 */
import React, { Text, Pressable, StyleSheet } from 'react-native'
import ImageLoader from '../../../../components/ImageLoader'
import { PlaceNeedingTranslation } from '../../../../global/types/Places'

/**
 * @typedef Props
 * @property {PlaceNeedingTranslation} place Place to display
 * @property {() => void} onPress Function to execute when the place is pressed
 */
type Props = {
  place: PlaceNeedingTranslation
  onPress: () => void
}

/**
 * @function PlaceDisplay
 * @description Component that renders a place on the needing translation list screen
 * @param place Place to display
 * @param onPress Function to execute when the place is pressed
 * @returns {JSX.Element} PlaceDisplay component
 */
export default function PlaceDisplay({ place, onPress }: Props): JSX.Element {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <ImageLoader
        imageURL={place.smallImage}
        imageStyle={styles.image}
      />
      <Text style={styles.text}>{place.name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 12,
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    height: 100,
    width: '20%',
    borderRadius: 12,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    width: '80%',
    textAlign: 'center',
    justifyContent: 'center',
  },
})
