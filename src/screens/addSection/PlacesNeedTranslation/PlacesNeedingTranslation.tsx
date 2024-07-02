/**
 * @fileoverview Places needing translation screen
 * @module PlacesNeedingTranslation
 * @requires react react-native
 */
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { ArtToTranslate } from '@global/types/Places'
import colors from '@global/colors'
import usePlacesNeedingTranslationController from './usePlacesNeedingTranslationController'
import TopBar from './Views/TopBar'
import ArtToDisplay from './Views/ArtToDisplay'

/**
 * @typedef Props
 * @property {any} navigation Navigation object
 */
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function PlacesNeedingTranslation
 * @description Component that renders the places needing translation screen
 * @param navigation Navigation object
 * @returns {JSX.Element} PlacesNeedingTranslation component template
 */
export default function PlacesNeedingTranslation({ navigation }: Props): JSX.Element {
  const { onCreatePress, onTextPress, onSendPress, artPieces, errorText, displayError } =
    usePlacesNeedingTranslationController({
      navigation,
    })

  return (
    <SafeAreaView>
      <TopBar navigation={navigation} />
      <ScrollView>
        {!displayError &&
          artPieces.map((artPiece: ArtToTranslate) => (
            <ArtToDisplay
              artPiece={artPiece}
              key={artPiece.id}
              onCreatePress={() => onCreatePress(artPiece.description)}
              onTextPress={() => onTextPress(artPiece.description, artPiece.name)}
              onSendPress={() => onSendPress(artPiece.id)}
            />
          ))}
      </ScrollView>
      {!displayError && artPieces.length === 0 && (
        <Text style={styles.text}>
          Nous n&apos;avons pas besoin de traductions actuellement, d&apos;autres demandes arriveront bientôt !
        </Text>
      )}
      {displayError && <Text style={[styles.text, styles.errorText]}>{errorText}</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
  },
  text: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 16,
  },
})
