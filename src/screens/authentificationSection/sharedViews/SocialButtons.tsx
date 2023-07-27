import React from 'react'
import { View } from 'react-native'
import SocialIcon from '@source/components/SocialIcon'

export default function SocialButtons() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 24,
      }}
    >
      <SocialIcon
        size={24}
        socialMedia='facebook'
        onPress={() => console.log('Facebook')}
      />
      <SocialIcon
        size={24}
        socialMedia='apple'
        onPress={() => console.log('Apple')}
      />
      <SocialIcon
        size={24}
        socialMedia='google'
        onPress={() => console.log('Google')}
      />
    </View>
  )
}
