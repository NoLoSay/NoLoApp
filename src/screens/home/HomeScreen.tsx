/**
 * @fileoverview Home screen component
 * @module HomeScreen
 * @description Home screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { colors } from '@global/colors'
import { useNavigation } from '@react-navigation/native'
import HeaderView from './Views/HeaderView'
import useHomeScreenController from './useHomeScreenController'
import CarouselView from './CarouselView/CarouselView'
import MapView from './MapView/MapView'

/**
 * @function HomeScreen
 * @description Component that renders the Home screen.
 * @returns {React.JSX.Element} App component template
 */
export default function HomeScreen(): React.JSX.Element {
  const { city, currentPage, displaySearchBar, toggleSearchBar, searchValue, setSearchValue, togglePage, places } =
    useHomeScreenController()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <HeaderView
        city={city}
        page={currentPage}
        togglePage={togglePage}
        displaySearchBar={displaySearchBar}
        toggleSearchBar={toggleSearchBar}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        navigation={navigation}
      />
      {currentPage === 'carousel' && (
        <CarouselView
          places={places}
          navigation={navigation}
        />
      )}
      {currentPage === 'map' && (
        <MapView
          places={places}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.veryLightGrey,
    flex: 1,
  },
})
