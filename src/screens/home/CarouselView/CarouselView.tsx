import React from 'react'
import { ScrollView } from 'react-native'
import Category from './Views/Category'

export default function CarouselView() {
  return (
    <ScrollView
      style={{ paddingLeft: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <Category text='Meilleurs lieux' />
      <Category text='Nouveaux lieux' />
      <Category text='Lieux à proximité' />
    </ScrollView>
  )
}
