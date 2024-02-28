/**
 * @fileoverview Home screen component
 * @module HomeScreen
 * @description Home screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LoadingModal from '@components/LoadingModal'
import { colors } from '@global/colors'
import HeaderView from './Views/HeaderView'
import useHomeScreenController from './useHomeScreenController'
import CarouselView from './CarouselView/CarouselView'
import MapView from './MapView/MapView'
import NoPlacesFound from './Views/NoPlacesFound'

/**
 * @function HomeScreen
 * @description Component that renders the Home screen.
 * @returns {React.JSX.Element} App component template
 */
export default function HomeScreen(): React.JSX.Element {
  const {
    city,
    currentPage,
    displaySearchBar,
    toggleSearchBar,
    searchValue,
    setSearchValue,
    togglePage,
    places,
    getNearestPlaces,
    getAllPlacesUsingSearch,
    isLoading,
    onRefresh,
    isRefreshing,
    isSuccessful,
  } = useHomeScreenController()
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
        getAllPlacesUsingSearch={getAllPlacesUsingSearch}
        navigation={navigation}
      />
      {currentPage === 'carousel' && isSuccessful && places.length > 0 && (
        <CarouselView
          places={places}
          navigation={navigation}
          getNearestPlaces={getNearestPlaces}
          isLoading={isRefreshing}
          onRefresh={onRefresh}
        />
      )}
      {currentPage === 'carousel' && isSuccessful && places.length === 0 && <NoPlacesFound />}
      {currentPage === 'map' && (
        <MapView
          places={places}
          navigation={navigation}
        />
      )}
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.veryLightGrey,
    flex: 1,
  },
})
