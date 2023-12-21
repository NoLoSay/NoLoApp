/**
 * @fileoverview Screen that displays the arts pieces to translate of a place
 * @module PlaceArtsPiecesScreen
 * @requires react react-native
 */
import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import TopBar from './Views/TopBar'
import usePlaceArtsPiecesScreenController from './usePlaceArtsPiecesScreenController'
import { ArtToTranslate, PlaceNeedingTranslation } from '../../../global/types/Places'
import ImageLoader from '../../../components/ImageLoader'
import ArtToDisplay from './Views/ArtToDisplay'

/**
 * @typedef Props
 * @property {any} navigation Navigation object
 * @property {any} route Route object
 */
type Props = {
  navigation: any
  route: {
    params: {
      placeNeedingTranslation: PlaceNeedingTranslation
    }
  }
}

/**
 * @function PlaceArtsPiecesScreen
 * @description Component that renders the places needing translation screen
 * @param navigation Navigation object
 * @param route Route object
 * @returns {JSX.Element} PlacesNeedingTranslation component template
 */
export default function PlaceArtsPiecesScreen({ navigation, route }: Props): JSX.Element {
  const { place, onCreatePress, doPlaceHaveOpenTranslation } = usePlaceArtsPiecesScreenController({
    navigation,
    route,
  })
  return (
    <>
      <TopBar
        navigation={navigation}
        text={place.name}
      />
      <ScrollView>
        <ImageLoader
          imageURL={place.bigImage}
          imageStyle={styles.illustrationImage}
        />
        {doPlaceHaveOpenTranslation() &&
          place.artsToTranslate.map((artPiece: ArtToTranslate) => (
            <ArtToDisplay
              artPiece={artPiece}
              key={artPiece.id}
              onCreatePress={() => onCreatePress(artPiece.textToTranslate)}
            />
          ))}
        {!doPlaceHaveOpenTranslation() && (
          <Text style={styles.text}>
            Ce lieu n&apos;a pas besoin de traduction pour le moment, mais des opportunités seront sûrement disponibles
            dans le futur !
          </Text>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  illustrationImage: {
    width: '95%',
    height: 120,
    borderRadius: 12,
    marginHorizontal: '2.5%',
    marginVertical: 12,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    width: '80%',
    marginTop: 20,
    marginHorizontal: '10%',
    textAlign: 'center',
  },
})
