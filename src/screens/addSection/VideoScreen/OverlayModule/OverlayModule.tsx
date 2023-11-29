/**
 * @fileoverview Overlay module that displays different options to help the user while he records a video.
 * @module OverlayModule
 * @requires react react-native
 */
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '@source/global/colors'
import images from '@source/global/images'
import useOverlayModuleController from './useOverlayModuleController'
import AssistantView from './Views/AssistantView'

type Props = {
  isRecording: boolean
}

/**
 * @function OverlayModule
 * @description Component that renders the Overlay module.
 * @param {boolean} isRecording Wether the user is recording a video or not
 * @returns {JSX.Element} OverlayModule component
 */
export default function OverlayModule({ isRecording }: Props): JSX.Element {
  const { isAssistantVisible, toggleAssistant } = useOverlayModuleController()

  const OPTIONS = [
    {
      title: 'Assistant',
      icon: images.icons.outline.assistant(),
      onPress: toggleAssistant,
      isActivated: isAssistantVisible,
    },
  ]

  return (
    <View style={styles.container}>
      {!isRecording && (
        <View style={styles.optionsContainer}>
          {OPTIONS.map(option => (
            <Pressable
              key={option.title}
              style={styles.overlayCategoryButton}
              onPress={option.onPress}
            >
              <Image
                source={option.icon}
                style={styles.icon}
              />
              <Text style={styles.categoryText}>{option.title}</Text>
              {option.isActivated && <View style={styles.activatedLine} />}
            </Pressable>
          ))}
        </View>
      )}
      {isAssistantVisible && <AssistantView />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlayCategoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionsContainer: {
    width: '20%',
    backgroundColor: colors.black,
    opacity: 0.5,
    paddingHorizontal: 4,
    paddingVertical: 8,
    position: 'absolute',
    right: 8,
    top: '16%',
    borderRadius: 16,
  },
  icon: {
    height: 36,
    aspectRatio: 1,
    tintColor: colors.white,
  },
  activatedLine: {
    position: 'absolute',
    top: 18,
    width: 56,
    height: 2,
    backgroundColor: colors.accent,
    transform: [{ rotate: '45deg' }],
  },
  categoryText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    textAlign: 'center',
    color: colors.white,
  },
})
