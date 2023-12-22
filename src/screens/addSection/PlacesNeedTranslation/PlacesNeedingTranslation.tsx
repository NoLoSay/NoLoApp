/**
 * @fileoverview Places needing translation screen
 * @module PlacesNeedingTranslation
 * @requires react react-native
 */
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import TopBar from './Views/TopBar'
import usePlacesNeedingTranslationController from './usePlacesNeedingTranslationController'
import { PlaceNeedingTranslation } from '../../../global/types/Places'
import LoadingModal from '../../../components/LoadingModal'
import PlaceDisplay from './Views/PlaceDisplay'
import ErrorModal from '../../../components/ErrorModal'

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
        {places.map((place: PlaceNeedingTranslation) => (
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
      <LoadingModal visible={isLoading} />
      <ErrorModal
        visible={displayError}
        errorText={errorText}
      />
    </SafeAreaView>
  )
}