/**
 * @fileoverview TopBar view of the PlacesNeedTranslation screen
 * @module TopBar
 * @description TopBar, it displays the title of the screen and a back button.
 * @requires react react-native
 */

import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import images from '../../../global/images'
import colors from '../../../global/colors'

/**
 * @typedef Props
 * @property {any} navigation Navigation object
 */
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
  title: string
}

/**
 * @function TopBar
 * @description Component that renders the TopBar view.
 * @param navigation TopBar navigation object
 * @param title TopBar title
 * @returns {React.JSX.Element} TopBar component template
 */
export default function TopBar({ navigation, title }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressablePosition}
        onPress={() => navigation.goBack()}
      >
        <FastImage
          source={images.icons.outline.backArrow()}
          style={styles.backIcon}
        />
      </Pressable>
      <Text style={styles.title}>{title.length > 28 ? `${title.substring(0, 28)}...` : title}</Text>
    </View>
  )
  // {item.name.length > 13 ? `${item.name.substring(0, 13)}...` : item.name}
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    color: colors.white,
  },
  pressablePosition: {
    position: 'absolute',
    left: 15,
  },
  backIcon: {
    height: 25,
    width: 20,
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'center',
  },
})
