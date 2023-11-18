/**
 * @fileoverview MainInfo view of the SettingsScreen component
 * @module TopBar
 * @description It displays essential information about the account such as the name of the user, his profile picture and his username.
 * @requires react react-native
 */

import React from 'react'
import colors from '@source/global/colors'
import images from '@source/global/images'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

type Props = {
  accountImage: string
  firstName: string
  lastName: string
  username: string
  showModal: () => void
}

/**
 * @function MainInfos
 * @param accountImage The image of the account
 * @param firstName The first name of the account
 * @param lastName The last name of the account
 * @param username The username of the account
 * @param showModal The function that shows the modal
 * @returns
 */
export default function MainInfos({ accountImage, firstName, lastName, username, showModal }: Props) {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.accountImage}
        source={{ uri: accountImage }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.username}>{`@${username}`}</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={showModal}
      >
        <FastImage
          style={styles.icon}
          source={images.icons.outline.pen()}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
    flex: 8,
    paddingLeft: 16,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '700',
  },
  username: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  container: {
    width: '100%',
    backgroundColor: colors.accent,
    borderRadius: 10,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  accountImage: {
    height: '66%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.white,
    flex: 3,
  },
  button: {
    height: '25%',
    flex: 1,
  },
  icon: {
    height: '100%',
    aspectRatio: 1,
  },
})
