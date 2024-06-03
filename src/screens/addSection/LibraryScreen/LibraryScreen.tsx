/**
 * @fileoverview This screen is used to display the library of the user.
 * @module LibraryScreen
 * @requires react-native
 */

import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import colors from '@global/colors'
import useLibraryScreenController from './useLibraryScreenController'
import TopBar from './Views/TopBar'
import VideoDisplay from './Views/VideoDisplay'

type Props = {
  navigation: any
}

export default function LibraryScreen({ navigation }: Props) {
  const { videos, displayVideos, error } = useLibraryScreenController()

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
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!displayVideos && !error && (
          <Text style={styles.text}>Vous n&apos;avez réalisé aucune vidéo pour le moment !</Text>
        )}
      </ScrollView>
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
  text: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 16,
  },
})
