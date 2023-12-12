/**
 * @fileoverview Place image component
 * @module PlaceImage
 * @description It displays the image of the place and handles the loading state of the image with a skeleton view.
 * @requires react react-native
 */
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { View, StyleSheet } from 'react-native'
import { Place } from '../../../../global/types/Places'
import colors from '../../../../global/colors'

type Props = {
  item: Place
}

/**
 * @function PlaceImage
 * @description Component that renders the image of the place and handles the loading of the image
 * @param item Place to display
 * @returns {JSX.Element}
 */
export default function PlaceImage({ item }: Props): JSX.Element {
  const [isImageLoading, setIsImageLoading] = useState(false)

  return (
    <>
      <FastImage
        source={{
          uri: item.image,
          priority: FastImage.priority.high,
        }}
        style={styles.image}
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
      />
      {isImageLoading && <View style={[StyleSheet.absoluteFill, styles.skeletonView]} />}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 96,
    height: 154,
    borderRadius: 20,
  },
  skeletonView: {
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
  },
})
