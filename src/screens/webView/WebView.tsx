/**
 * @fileoverview WebView screen component
 * @module WebView Screen
 * @description WebView screen, it is the screen that the user will use to navigate to the web app.
 * @requires react react-native
 */
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import images from '@global/images'
import colors from '@global/colors'
import ErrorPage from './ErrorView'
import useWebViewScreenController from './useWebViewController'

type AuthStackParamList = {
  WebViewModal: { uri?: string; name?: string } // Make 'uri' optional as a route parameter
}

type WebViewScreenRouteProp = RouteProp<AuthStackParamList, 'WebViewModal'>

/**
 * @interface Props
 * @description WebView screen props types
 * @property {WebViewScreenRouteProp} route The route prop
 */
interface Props {
  route: WebViewScreenRouteProp
}

/**
 * @function Spinner
 * @description Component that renders a spinner.
 * @returns {React.JSX.Element} App component template
 */
function Spinner(): React.JSX.Element {
  return (
    <ActivityIndicator
      size='large'
      color={colors.accent}
      style={styles.loader}
    />
  )
}

/**
 * @function WebViewScreen
 * @description Component that renders the WebView screen.
 * @returns {React.JSX.Element} App component template
 */
export default function WebViewScreen({ route }: Props): React.JSX.Element {
  const { uri, name } = route.params
  const { goBack, openInBrowser, isLoading, toggleLoading, errorCode, setErrorCode } = useWebViewScreenController({
    uri: uri ?? 'https://www.google.com',
  })

  if (!uri || errorCode) {
    return (
      <ErrorPage
        goBack={goBack}
        errorCode={errorCode}
      />
    )
  }

  return (
    <SafeAreaView
      style={styles.webViewContainer}
      edges={['top']}
    >
      {isLoading && <Spinner />}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={images.icons.outline.cross()}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{name}</Text>
        <TouchableOpacity onPress={openInBrowser}>
          <Image
            source={images.icons.outline.open()}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri }}
        onError={() => {
          setErrorCode(410)
        }}
        onLoadEnd={toggleLoading}
        allowsLinkPreview
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: colors.accent,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
    color: colors.accent,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: colors.darkGrey,
  },
  loader: {
    position: 'absolute',
    top: '48%',
    left: '48%',
    zIndex: 1,
  },
})
