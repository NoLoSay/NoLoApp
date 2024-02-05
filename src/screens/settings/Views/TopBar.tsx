/**
 * @fileoverview TopBar view of the SettingsScreen component
 * @module TopBar
 * @description TapBar, it displays the title of the screen and a back button.
 * @requires react react-native
 */

import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import images from '@global/images'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function TopBar
 * @description Component that renders the TopBar view.
 * @param navigation TopBar navigation object
 * @returns {React.JSX.Element} TopBar component template
 */
export default function TopBar({ navigation }: Props) {
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
      <Text style={styles.title}>Profil</Text>
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
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '500',
    textAlign: 'center',
  },
})
