/**
 * @fileoverview Component that renders a video on the library screen
 * @module VideoDisplay
 * @requires react react-native
 */
import React, { Text, StyleSheet, View } from 'react-native'
import ImageLoader from '@components/ImageLoader'
import { VideoValidationStatus } from '@global/types/Videos'
import { VideoLibrary } from '@global/types/httpClient/queries/videos'

/**
 * @typedef Props
 * @property {Video} Video Video to display
 */
type Props = {
  video: VideoLibrary
}

/**
 * @function VideoDisplay
 * @description Component that renders a video on the library screen
 * @param place Video to display
 * @returns {JSX.Element} VideoDisplay component
 */
export default function VideoDisplay({ video }: Props): JSX.Element {
  const validationStatus =
    // eslint-disable-next-line no-nested-ternary
    video.validationStatus === VideoValidationStatus.Pending
      ? { text: 'En attente de vérification', color: 'orange' }
      : VideoValidationStatus.Approved
        ? { text: 'Validé', color: 'green' }
        : { text: 'Refusé', color: 'red' }

  return (
    <View style={styles.container}>
      <ImageLoader
        imageURL={video.item.picture}
        imageStyle={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.placeText}>{video.item.name}</Text>
        <Text style={[styles.state, { color: validationStatus.color }]}>État: {validationStatus.text}</Text>
        <Text style={styles.durationText}>
          Durée de la vidéo: {(video.duration / 60).toFixed()}mn
          {video.duration % 60 !== 0 ? ` ${video.duration % 60}s` : ''}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 12,
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  image: {
    height: 100,
    width: '20%',
    borderRadius: 12,
  },
  placeText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  artWorkText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 2,
  },
  state: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
    marginTop: 4,
  },
  durationText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 8,
  },
})
