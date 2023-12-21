/**
 * @fileoverview Screen that displays the text that must be translated
 * @module TextScreen
 * @requires react react-native
 */
import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import TopBar from './Views/TopBar'

/**
 * @typedef Props
 * @property {any} navigation Navigation object
 * @property {any} route Route object
 */
type Props = {
  navigation: any
  route: {
    params: {
      textToTranslate: string
      artName: string
    }
  }
}

/**
 * @function TextScreen
 * @description Component that renders the text that must be translated
 * @param navigation Navigation object
 * @param route Route object
 * @returns {JSX.Element} TextScreen component template
 */
export default function TextScreen({ navigation, route }: Props): JSX.Element {
  return (
    <>
      <TopBar
        navigation={navigation}
        text={route.params.artName}
      />
      <ScrollView>
        <Text style={styles.text}>{route.params.textToTranslate}</Text>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 16,
    marginHorizontal: '5%',
    textAlign: 'left',
    lineHeight: 36,
  },
})
