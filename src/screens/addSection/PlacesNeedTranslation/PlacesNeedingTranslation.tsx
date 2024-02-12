/**
 * @fileoverview Places needing translation screen
 * @module PlacesNeedingTranslation
 * @requires react react-native
 */
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import { PlaceNeedingTranslation } from '@global/types/Places'
import LoadingModal from '@components/LoadingModal'
import colors from '@global/colors'
import usePlacesNeedingTranslationController from './usePlacesNeedingTranslationController'
import TopBar from './Views/TopBar'
import PlaceDisplay from './Views/PlaceDisplay'

/**
 * @typedef Props
 * @property {any} navigation Navigation object
 */
type Props = {
  navigation: any
}

/**
 * @function PlacesNeedingTranslation
 * @description Component that renders the places needing translation screen
 * @param navigation Navigation object
 * @returns {JSX.Element} PlacesNeedingTranslation component template
 */
export default function PlacesNeedingTranslation({ navigation }: Props): JSX.Element {
  const { onPlacePress, places, isLoading, errorText, displayError } = usePlacesNeedingTranslationController({
    navigation,
  })

  return (
    <SafeAreaView>
      <TopBar navigation={navigation} />
      <ScrollView>
        {!displayError &&
          places.map((place: PlaceNeedingTranslation) => (
            <PlaceDisplay
              place={place}
              key={place.id}
              onPress={() =>
                onPlacePress({
                  place,
                })
              }
            />
          ))}
      </ScrollView>
      {displayError && <Text style={styles.errorText}>{errorText}</Text>}
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    color: colors.error,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 16,
  },
})
