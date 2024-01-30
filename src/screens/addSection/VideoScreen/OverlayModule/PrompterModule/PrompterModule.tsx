/**
 * @fileoverview PrompterModule component.
 * @module PrompterModule
 * @requires react react-native
 */
import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import Slider from '@react-native-community/slider'
import colors from '@global/colors'
import usePrompterModuleController from './usePrompterModuleController'

type Props = {
  text: string
  isRecording: boolean
  timer: number
}

/**
 * @function PrompterModule
 * @description Component that renders the prompter module.
 * @returns {JSX.Element} PrompterModule component
 */
export default function PrompterModule({ text, isRecording, timer }: Props): JSX.Element {
  const { svRef, speed, setSpeed, size, setSize } = usePrompterModuleController({ isRecording, timer })

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.prompterOverlay}
        ref={svRef}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.text, { fontSize: size }]}>{text}</Text>
      </ScrollView>
      {!isRecording && (
        <View style={styles.slidersOVerlay}>
          <Text style={styles.textStyle}>Taille du texte</Text>
          <Slider
            minimumValue={24}
            maximumValue={48}
            maximumTrackTintColor={colors.darkGrey}
            minimumTrackTintColor={colors.accent}
            step={4}
            value={size}
            onValueChange={value => setSize(value)}
          />
          <Text style={styles.textStyle}>Vitesse de défilement</Text>
          <Slider
            minimumValue={4}
            maximumValue={20}
            maximumTrackTintColor={colors.darkGrey}
            minimumTrackTintColor={colors.accent}
            step={1}
            value={speed}
            onValueChange={value => setSpeed(value)}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  prompterOverlay: {
    position: 'absolute',
    top: '14%',
    left: '5%',
    height: '54%',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.black,
    opacity: 0.8,
    borderRadius: 16,
  },
  text: {
    color: colors.white,
    fontSize: 36,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  slidersOVerlay: {
    position: 'relative',
    top: '70%',
    left: '5%',
    width: '90%',
    backgroundColor: colors.black,
    opacity: 0.8,
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  textStyle: {
    color: colors.white,
    fontFamily: 'Poppins',
  },
})
