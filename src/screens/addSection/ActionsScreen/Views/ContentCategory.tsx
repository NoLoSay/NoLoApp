/**
 * @fileoverview Actions screen component
 * @module ActionsScreen
 * @description Actions screen, it is the first screen that a user sees when clicking on the + tab
 * @requires react react-native
 */

import React from 'react'
import { Image, LayoutRectangle, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'
import AddContentCategory from '@global/types/AddContentCategory'
import { colors } from '@global/colors'
import images from '@global/images'

/**
 * @typedef ContentCategoryProps
 * @property {AddContentCategory} contentCategory
 * @property {() => void} onPress
 */
interface ContentCategoryProps {
  contentCategory: AddContentCategory
  onPress: () => void
}

/**
 * @function ActionsScreen
 * @description Component that renders the Scan screen.
 * @param {ContentCategoryProps} props Component props
 * @returns {React.JSX.Element} App component template
 */
export default function ContentCategory({ contentCategory, onPress }: ContentCategoryProps): React.JSX.Element {
  const [iconContainerSize, setIconContainerSize] = React.useState<LayoutRectangle | undefined>()

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={styles.iconContainer}
        onLayout={event => setIconContainerSize(event.nativeEvent.layout)}
      >
        <FastImage
          source={contentCategory.icon() as unknown as Source}
          style={{ width: (iconContainerSize?.width ?? 40) - 16, height: (iconContainerSize?.width ?? 40) - 16 }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{contentCategory.title}</Text>
        {contentCategory.subtitle !== null ?? <Text style={styles.subtitle}>{contentCategory.subtitle}</Text>}
      </View>
      <Image
        style={styles.arrowContainer}
        source={images.icons.outline.backArrow()}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.dark,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'row',
  },
  iconContainer: {
    height: 60,
    alignSelf: 'center',
    marginBottom: 8,
    backgroundColor: colors.white,
    borderRadius: 50,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    height: 20,
    width: 10,
    alignSelf: 'center',
    tintColor: colors.darkGrey,
    marginBottom: 8,
    borderRadius: 50,
  },
})
