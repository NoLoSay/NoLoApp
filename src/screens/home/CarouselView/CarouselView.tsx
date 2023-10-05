import React from 'react'
import { ScrollView } from 'react-native'
import { Place } from '@source/global/types/Places'
import Category from './Views/Category'

interface CarouselViewProps {
  places: Place[]
}

export default function CarouselView({ places }: CarouselViewProps): React.JSX.Element {
  return (
    <ScrollView
      style={{ paddingLeft: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Category
        text='Meilleurs lieux'
        places={places}
      />
      <Category
        text='Nouveaux lieux'
        places={places}
      />
      <Category
        text='Lieux à proximité'
        places={places}
      />
    </ScrollView>
  )
}
