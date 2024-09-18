/**
 * @fileoverview Social icon component
 * @module SocialIcon
 * @description Social icon component, it is a button that displays a social media icon.
 * @requires react react-native
 * @requires Image react-native
 * @requires Pressable react-native
 */

import React from 'react'
import { Image, StyleSheet, Pressable } from 'react-native'
import { images } from '../global/images'
import { colors } from '../global/colors'

interface SocialIconProps {
  socialMedia: 'facebook' | 'google' | 'apple'
  size?: number
  darkMode?: boolean
  onPress?: () => void
}

/**
 * @function SocialIcon - Social icon component
 * @param {SocialIconProps} props - Component props
 * @param {string} props.socialMedia - Social media to display
 * @param {number} [props.size=24] - Size of the icon in pixels
 * @param {boolean} [props.darkMode=false] - Wether the icon should be dark or not
 * @param {Function} [props.onPress] - Function that is called when the icon is pressed
 * @returns {JSX.Element}
 */
export default function SocialIcon({ socialMedia, size = 24, darkMode = false, onPress }: SocialIconProps) {
  const socialMediaIcon = {
    facebook: images.icons.social.facebook,
    google: images.icons.social.google,
    apple: images.icons.social.apple,
  }

  const socialMediaColor = {
    facebook: colors.facebook,
    google: colors.google,
    apple: colors.apple,
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.socialButton,
        { backgroundColor: socialMediaColor[socialMedia], opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={onPress}
    >
      <Image
        source={socialMediaIcon[socialMedia]()}
        style={[styles.logo, { height: size, width: size }, darkMode && styles.darkMode]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkMode: {
    tintColor: 'white',
  },
})
