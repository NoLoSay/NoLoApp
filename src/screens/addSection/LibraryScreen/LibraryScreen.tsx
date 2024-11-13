/**
 * @fileoverview This screen is used to display the library of the user.
 * @module LibraryScreen
 * @requires react-native
 */

import React, { useMemo } from 'react'
import { StyleSheet, ScrollView, View, Text, Modal } from 'react-native'
import colors from '@global/colors'
import useLibraryScreenController from './useLibraryScreenController'
import TopBar from './Views/TopBar'
import VideoDisplay from './Views/VideoDisplay'
import Button from '@components/Button'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function LibraryScreen
 * @description Component that renders the Library screen.
 * @param navigation LibraryScreen navigation object
 * @returns {React.JSX.Element} LibraryScreen component template
 */
export default function LibraryScreen({ navigation }: Props) {
  const { videos, displayVideos, error, currentId, setCurrentId } = useLibraryScreenController()
  const videoDetail = useMemo(() => videos.find(video => video.id === currentId), [currentId])

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        {displayVideos &&
          videos.map(video => (
            <VideoDisplay
              key={video.id}
              video={video}
              setCurrentId={setCurrentId}
            />
          ))}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!displayVideos && !error && (
          <Text style={styles.text}>Vous n&apos;avez réalisé aucune vidéo pour le moment !</Text>
        )}
      </ScrollView>
      <Modal
        visible={!!currentId}
        transparent
      >
        <View style={modalStyles.background}>
          <View style={[modalStyles.container]}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'Poppins',
                fontWeight: '700',
              }}
            >
              {videoDetail?.item.name}
            </Text>
            <Text>Durée: {videoDetail?.duration}</Text>
            <Text>Nombre de like: {videoDetail?.likeBy?.length ?? 0}</Text>
            <Text>Création: {new Date(videoDetail?.createdAt as unknown as string).toLocaleDateString()}</Text>
            <Text style={modalStyles.text}>{}</Text>
            <Button
              text='Revenir'
              onPress={() => setCurrentId(undefined)}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const modalStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000A0',
    zIndex: 100,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 32,
    borderRadius: 8,
    width: '80%',
  },
  text: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    fontWeight: '700',
  },
})

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
