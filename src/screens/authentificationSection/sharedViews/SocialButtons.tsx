/**
 * @fileoverview Social buttons component
 * @module SocialButtons
 * @description Component that renders the social buttons.
 * @requires react react
 * @requires react-native react-native
 * @requires ../../..//components/SocialIcon SocialIcon component
 * @exports SocialButtons
 */

import React from 'react'
import { View } from 'react-native'
import SocialIcon from '@components/SocialIcon'

/**
 * @function SocialButtons
 * @description Component that renders the social buttons.
 * @returns {JSX.Element} SocialButtons component
 */
export default function SocialButtons(): JSX.Element {
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
        // eslint-disable-next-line no-console
        onPress={() => console.log('Facebook')}
      />
      <SocialIcon
        size={24}
        socialMedia='apple'
        // eslint-disable-next-line no-console
        onPress={() => console.log('Apple')}
      />
      <SocialIcon
        size={24}
        socialMedia='google'
        // eslint-disable-next-line no-console
        onPress={() => console.log('Google')}
      />
    </View>
  )
}
