/**
 * @fileoverview Carousel view component
 * @module CarouselView
 * @description Component that renders the carousel view, it allows users to see places in a carousel.
 * @requires react react-native
 * @requires ScrollView react-native
 * @requires RefreshControl react-native
 */
import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { Place } from '../../../global/types/Places'
import Category from './Views/Category'

interface CarouselViewProps {
  places: Place[]
  navigation: any
  getNearestPlaces: () => Place[]
  isLoading: boolean
  onRefresh: () => void
}

/**
 * @function CarouselView
 * @description Component that renders the carousel view.
 * @param places Places to display on the carousel
 * @param navigation Navigation object
 * @param getNearestPlaces Function to get the nearest places
 * @param isLoading Loading state of the carousel
 * @param onRefresh Function to refresh the carousel
 * @returns {React.JSX.Element}
 */
export default function CarouselView({
  places,
  navigation,
  getNearestPlaces,
  isLoading,
  onRefresh,
}: CarouselViewProps): React.JSX.Element {
  return (
    <ScrollView
      style={{ paddingLeft: 20 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      }
    >
      <Category
        text='Meilleurs lieux'
        places={places}
        navigation={navigation}
      />
      <Category
        text='Nouveaux lieux'
        places={places}
        navigation={navigation}
      />
      <Category
        text='Lieux à proximité'
        places={getNearestPlaces()}
        navigation={navigation}
      />
    </ScrollView>
  )
}
