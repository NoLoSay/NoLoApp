import React from 'react'
import { ScrollView } from 'react-native'
import { Place } from '@source/global/types/Places'
import Category from './Views/Category'

interface CarouselViewProps {
  places: Place[]
  navigation: any
  getNearestPlaces: () => Place[]
}

export default function CarouselView({ places, navigation, getNearestPlaces }: CarouselViewProps): React.JSX.Element {
  return (
    <ScrollView
      style={{ paddingLeft: 20 }}
      showsVerticalScrollIndicator={false}
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
