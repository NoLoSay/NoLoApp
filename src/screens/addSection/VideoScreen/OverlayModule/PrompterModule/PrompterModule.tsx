/**
 * @fileoverview PrompterModule component.
 * @module PrompterModule
 * @requires react react-native
 */
import colors from '@source/global/colors'
import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import Slider from '@react-native-community/slider'
import usePrompterModuleController from './usePrompterModuleController'

type Props = {
  text: string
  isRecording: boolean
}

/**
 * @function PrompterModule
 * @description Component that renders the prompter module.
 * @returns {JSX.Element} PrompterModule component
 */
export default function PrompterModule({ text, isRecording }: Props): JSX.Element {
  const [speed, setSpeed] = React.useState<number>(10)
  const { svRef } = usePrompterModuleController({ isRecording, speed })
  const [textSize, setTextSize] = React.useState<number>(36)

  return (
    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <ScrollView
        style={styles.prompterOverlay}
        ref={svRef}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.text, { fontSize: textSize }]}>{text}</Text>
      </ScrollView>
      {!isRecording && (
        <>
          <Slider
            minimumValue={24}
            maximumValue={48}
            maximumTrackTintColor={colors.darkGrey}
            minimumTrackTintColor={colors.accent}
            step={4}
            value={textSize}
            onValueChange={value => setTextSize(value)}
            style={styles.sliderPosition}
          />
          <Slider
            minimumValue={4}
            maximumValue={20}
            maximumTrackTintColor={colors.darkGrey}
            minimumTrackTintColor={colors.accent}
            step={1}
            value={speed}
            onValueChange={value => setSpeed(value)}
            style={styles.slider2Position}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  prompterOverlay: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    height: '50%',
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
  sliderPosition: {
    position: 'absolute',
    top: '75%',
    left: '12.5%',
    width: '75%',
  },
  slider2Position: {
    position: 'absolute',
    top: '80%',
    left: '12.5%',
    width: '75%',
  },
})
