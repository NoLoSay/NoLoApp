/**
 * @fileoverview ImageLoader component
 * @module ImageLoader
 * @description ImageLoader component, it is a place holder for images that are being loaded.
 * @requires react react-native
 * @requires FastImage react-native-fast-image
 * @link https://reactnative.dev/docs/pressable
 */
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import colors from '../global/colors'

type Props = {
  imageURL: string
  imageStyle: ImageStyle
}

/**
 * @function PlaceImage
 * @param {string} imageURL - The URL of the image to load
 * @param {ImageStyle} imageStyle - The style of the image
 * @returns {JSX.Element}
 */
export default function PlaceImage({ imageURL, imageStyle }: Props): JSX.Element {
  const [isImageLoading, setIsImageLoading] = useState(false)

  return (
    <>
      <FastImage
        source={{
          uri: imageURL,
          priority: FastImage.priority.high,
        }}
        style={[imageStyle, isImageLoading && { width: 0, height: 0 }]}
        onLoadStart={() => setIsImageLoading(true)}
        onLoadEnd={() => setIsImageLoading(false)}
      />
      {isImageLoading && <View style={[imageStyle, styles.skeletonView]} />}
    </>
  )
}

const styles = StyleSheet.create({
  skeletonView: {
    position: 'relative',
    left: 0,
    backgroundColor: colors.lightGrey,
  },
})
