import { colors } from '@source/global/colors'
import { images } from '@source/global/images'
import React from 'react'
import { Image, StyleSheet, Pressable } from 'react-native'

interface SocialIconProps {
  socialMedia: 'facebook' | 'google' | 'apple'
  size?: number
  darkMode?: boolean
  onPress?: () => void
}

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
        source={socialMediaIcon[socialMedia]}
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
