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
import Button from '@components/Button'

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
  const { onCreatePress, onTextPress, onSendPress, artPieces, errorText, displayError, isModerator } =
    usePlacesNeedingTranslationController({
      navigation,
    })

  return (
    <SafeAreaView>
      <TopBar
        navigation={navigation}
        displayReturnArrow={false}
      />
      <ScrollView>
        <Button
          text='Voir mes vidéos en attente de validation'
          onPress={() => navigation.navigate('LibraryScreen')}
          style={{ marginHorizontal: 18, marginBottom: 10 }}
          textStyle={{ fontSize: 16 }}
        />
        {isModerator && (
          <Button
            text='Valider des vidéos'
            onPress={() => console.log('Valider des vidéos')}
            style={{ marginHorizontal: 18 }}
            textStyle={{ fontSize: 16 }}
          />
        )}
        {!displayError &&
          artPieces.map((artPiece: ArtToTranslate) => (
            <ArtToDisplay
              artPiece={artPiece}
              key={artPiece.id}
              onCreatePress={() => onCreatePress(artPiece.textToTranslate)}
              onTextPress={() => onTextPress(artPiece.textToTranslate, artPiece.name)}
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
