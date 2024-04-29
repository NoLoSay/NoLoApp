/**
 * @fileoverview This screen is used to display the library of the user.
 * @module LibraryScreen
 * @requires react-native
 */

import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import LoadingModal from '@components/LoadingModal'
import colors from '@global/colors'
import useLibraryScreenController from './useLibraryScreenController'
import TopBar from './Views/TopBar'
import VideoDisplay from './Views/VideoDisplay'

type Props = {
  navigation: any
}

export default function LibraryScreen({ navigation }: Props) {
  const { videos, loading, displayVideos, error } = useLibraryScreenController()

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        {displayVideos &&
          videos.map(video => (
            <VideoDisplay
              key={video.item.name}
              video={video}
            />
          ))}
        {error && <Text style={styles.errorText}>{error ?? 'Une erreur est survenue.'}</Text>}
      </ScrollView>
      {/* <LoadingModal visible={loading} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  errorText: {
    textAlign: 'center',
    color: colors.error,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 16,
  },
})
