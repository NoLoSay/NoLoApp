/**
 * WebView Controller
 * @module src/screens/webView/useWebViewController
 * @description WebView Controller
 * @requires react
 * @requires react-native
 * @requires @react-navigation/native
 */
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Linking } from 'react-native'

/**
 * @interface WebViewController
 * @description WebView Controller types
 * @property {() => void} goBack The function to go back to the previous screen
 * @property {() => void} openInBrowser The function to open the web page in the browser
 * @property {boolean} isLoading The loading state of the web page
 * @property {() => void} toggleLoading The function to toggle the loading state of the web page
 * @property {number | undefined} errorCode The error code of the web page
 * @property {(code: number) => void} setErrorCode The function to set the error code of the web page
 */
interface WebViewController {
  goBack: () => void
  openInBrowser: () => void
  isLoading: boolean
  toggleLoading: () => void
  errorCode: number | undefined
  setErrorCode: (code: number) => void
}

/**
 * @interface WebViewControllerProps
 * @description WebView Controller props types
 * @property {string} uri The uri of the web page to display
 */
interface WebViewControllerProps {
  uri: string
}

/**
 * @function useWebViewController
 * @description WebView Controller hook logic function
 * @param {WebViewControllerProps} props The props of the controller hook
 * @param props.uri The uri of the web page to display
 * @returns {WebViewController} The controller of the WebView screen
 */
export default function useWebViewController({ uri }: WebViewControllerProps): WebViewController {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [errorCode, setErrorCode] = useState<undefined | number>(uri === undefined ? 404 : undefined)

  function goBack() {
    navigation.goBack()
  }

  function openInBrowser() {
    Linking.openURL(uri)
  }

  function toggleLoading() {
    setIsLoading(!isLoading)
  }

  return {
    goBack,
    openInBrowser,
    isLoading,
    toggleLoading,
    errorCode,
    setErrorCode,
  }
}
