/**
 * @fileoverview TopBar view of the PlacesNeedTranslation screen
 * @module TopBar
 * @description TopBar, it displays the title of the screen and a back button.
 * @requires react react-native
 */

import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import images from '@global/images'

/**
 * @typedef Props
 * @property {any} navigation Navigation object
 * @property {string} text Text to display
 */
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
  text: string
}

/**
 * @function TopBar
 * @description Component that renders the TopBar view.
 * @param navigation TopBar navigation object
 * @param text Text to display
 * @returns {React.JSX.Element} TopBar component template
 */
export default function TopBar({ navigation, text }: Props): JSX.Element {
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
      <Text style={styles.title}>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
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
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'center',
  },
})
