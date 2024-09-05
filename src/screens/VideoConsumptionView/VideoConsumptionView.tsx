/**
 * @fileoverview Scan screen component
 * @module ScanScreen
 * @description Scan screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import YoutubeIframe from 'react-native-youtube-iframe'
// import WebView from 'react-native-webview'
// import Video from 'react-native-video'
import Button from '@components/Button'
import { colors } from '@global/colors'
import useVideoConsumptionViewController from './useVideoConsumptionViewController'
import TopBar from './Views/TopBar'

interface VideoConsumptionViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
  route: {
    params: {
      itemId: string
    }
  }
}

/**
 * @function ScanScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function VideoConsumptionView({ navigation, route }: VideoConsumptionViewProps): React.JSX.Element {
  const { videoId, title, videoWidth, videoHeight, videoText } = useVideoConsumptionViewController({ route })

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        title={title}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        {/* <WebView
          source={{ uri: `http://localhost:3002/watch/8dd248b1-2414-46c5-b7f4-be89f9561626` }}
          style={{ marginTop: 20, height: videoHeight, width: videoWidth }}
          injectedJavaScript="
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.paddingBottom = 'unset';
            true;
          "
          injectedJavaScriptForMainFrameOnly
        /> */}
        <YoutubeIframe
          height={videoHeight}
          width={videoWidth}
          play
          videoId={videoId}
          webViewProps={{
            injectedJavaScript: `
        var element = document.getElementsByClassName('container')[0];
        element.style.position = 'unset';
        element.style.paddingBottom = 'unset';
        true;
      `,
          }}
        />
        {/* <Video
          // eslint-disable-next-line global-require
          source={{ uri: `http://localhost:3002/watch/8dd248b1-2414-46c5-b7f4-be89f9561626` }}
          style={{ marginTop: 20, height: videoHeight, width: videoWidth }}
          onBuffer={buffer => console.log(buffer)}
          onError={error => console.log(error)}
          controls
        /> */}
        <ScrollView>
          <Text style={styles.description}>{videoText}</Text>
        </ScrollView>
        <Button
          text='En savoir +'
          onPress={() => console.log(`En savoir + à propos de la vidéo ${videoId}`)}
          textStyle={styles.buttonTextStyle}
          containerStyle={styles.buttonStyle}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  description: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    fontFamily: 'Poppins',
    fontWeight: '200',
    fontSize: 14,
  },
  buttonTextStyle: {
    paddingHorizontal: 16,
  },
  buttonStyle: {
    alignSelf: 'center',
  },
})
