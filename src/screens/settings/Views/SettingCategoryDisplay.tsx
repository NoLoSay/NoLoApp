/**
 * @fileoverview Single category display view for the SettingsScreen component
 * @module SettingCategoryDisplay
 * @description Display of a single category of the SettingsScreen component
 * @requires react react-native
 */
import colors from '@source/global/colors'
import images from '@source/global/images'
import React from 'react'
import { Image, ImageProps, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

type Props = {
  id: number
  title: string
  subtitle?: string
  onPress?: () => void
  icon?: React.ReactNode
  childrenIcon?: React.ReactNode
  backIconColor?: string
  iconColor?: string
}

/**
 * @function SettingCategoryDisplay
 * @param id The id of the category
 * @param title The title of the category
 * @param subtitle The subtitle of the category
 * @param onPress The function that is called when the category is pressed
 * @param icon The icon of the category
 * @param childrenIcon The icon of the category's children
 * @param backIconColor The color of the back icon
 * @param iconColor The color of the icon
 * @returns {React.JSX.Element} SettingCategoryDisplay component template
 */
export default function SettingCategoryDisplay({
  id,
  title,
  subtitle,
  onPress,
  icon,
  childrenIcon,
  backIconColor = '#FFFCF4',
  iconColor = colors.accent,
}: Props): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
      key={id}
    >
      <View style={[styles.imageContainer, { backgroundColor: backIconColor }]}>
        <Image
          source={icon as ImageProps['source']}
          style={[styles.image, { tintColor: iconColor }]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {!childrenIcon && (
        <FastImage
          source={images.icons.outline.backArrow()}
          style={styles.penIcon}
        />
      )}
      {childrenIcon && <View style={styles.childIcon}>{childrenIcon}</View>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    padding: 10,
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 25,
    padding: 10,
    flex: 2,
  },
  image: {
    aspectRatio: 1,
    flex: 1,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 22,
    paddingLeft: 12,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '300',
    color: colors.darkGrey,
  },
  penIcon: {
    height: 16,
    aspectRatio: 2 / 3,
    flex: 1,
  },
  childIcon: {
    flex: 1,
    right: 36,
  },
})
