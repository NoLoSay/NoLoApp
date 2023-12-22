/**
 * @fileoverview This screen is used to display the library of the user.
 * @module LibraryScreen
 * @requires react-native
 */

import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import useLibraryScreenController from './useLibraryScreenController'
import TopBar from './Views/TopBar'
import LoadingModal from '../../../components/LoadingModal'
import VideoDisplay from './Views/VideoDisplay'

type Props = {
  navigation: any
}

export default function LibraryScreen({ navigation }: Props) {
  const { videos, loading } = useLibraryScreenController()

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        {videos.map(video => (
          <VideoDisplay
            key={video.id}
            video={video}
          />
        ))}
      </ScrollView>
      <LoadingModal visible={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
})
