/**
 * @fileoverview MainInfo view of the SettingsScreen component
 * @module TopBar
 * @description It displays essential information about the account such as the name of the user, his profile picture and his username.
 * @requires react react-native
 */

import React from 'react'
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'
import colors from '@global/colors'
import DeviceInfo from 'react-native-device-info'

type Props = {
  accountImage: string
  email: string
  username: string
}

/**
 * @function MainInfos
 * @param accountImage The image of the account
 * @param firstName The first name of the account
 * @param lastName The last name of the account
 * @param username The username of the account
 * @returns
 */
export default function MainInfos({ accountImage, email, username }: Props) {
  return (
    <Pressable
      style={styles.container}
      delayLongPress={3000}
      onLongPress={() => Alert.alert('Version number', DeviceInfo.getVersion())}
    >
      <FastImage
        style={styles.accountImage}
        source={{ uri: accountImage }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{email}</Text>
        <Text style={styles.username}>{`@${username}`}</Text>
      </View>
    </Pressable>
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
    marginBottom: 16,
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
