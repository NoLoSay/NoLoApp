import colors from '@source/global/colors'
import images from '@source/global/images'
import React from 'react'
import { Image, ImageProps, Pressable, StyleSheet, Text, View } from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'

type Props = {
  title: string
  subtitle?: string
  onPress?: () => void
  icon?: React.ReactNode
  childrenIcon?: React.ReactNode
  backIconColor?: string
  iconColor?: string
}

export default function SettingCategoryDisplay({
  title,
  subtitle,
  onPress,
  icon,
  childrenIcon,
  backIconColor = '#FFFCF4',
  iconColor = colors.accent,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <View style={{ aspectRatio: 1, borderRadius: 25, backgroundColor: backIconColor, padding: 10, flex: 2 }}>
        <Image
          source={icon as ImageProps['source']}
          style={{ aspectRatio: 1, tintColor: iconColor, flex: 1 }}
        />
      </View>
      <View style={{ flexDirection: 'column', flex: 22, paddingLeft: 12 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '500' }}>{title}</Text>
        {subtitle && (
          <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '300', color: colors.darkGrey }}>
            {subtitle}
          </Text>
        )}
      </View>
      {!childrenIcon && (
        <FastImage
          source={images.icons.outline.backArrow()}
          style={{ height: 16, aspectRatio: 2 / 3, flex: 1 }}
        />
      )}
      {childrenIcon && <View style={{ flex: 1, right: 36 }}>{childrenIcon}</View>}
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
})
