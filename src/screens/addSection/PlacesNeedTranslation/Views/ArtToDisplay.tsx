import React from 'react'
import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ArtToTranslate } from '@global/types/Places'
import ImageLoader from '@components/ImageLoader'
import images from '@global/images'
import colors from '@global/colors'

/**
 * @typedef IconProps
 * @property {ImageProps} iconURI Icon image
 * @property {string} text Icon text
 * @property {() => void} onPress Function to execute when the icon is pressed
 */
type IconProps = {
  iconURI: ImageProps
  text: string
  onPress: () => void
}

/**
 * @function Icon
 * @description Component that renders a pressable icon
 * @param iconURI Icon image
 * @param text Icon text
 * @param onPress Function to execute when the icon is pressed
 * @returns {JSX.Element} Icon component template
 */
function Icon({ iconURI, text, onPress }: IconProps): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Image
          source={iconURI}
          style={styles.icon}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

/**
 * @tydef ArtToDisplayProps
 * @property {ArtToTranslate} artPiece Art piece to display
 * @property {() => void} onCreatePress Function to execute when the create button is pressed
 */
type ArtToDisplayProps = {
  artPiece: ArtToTranslate
  onCreatePress: () => void
  onTextPress: () => void
}

/**
 * @function ArtToDisplay
 * @description Component that renders an art piece to translate
 * @param artPiece Art piece to display
 * @param onCreatePress Function to execute when the create button is pressed
 * @param onTextPress Function to execute when the text button is pressed
 * @returns {JSX.Element} ArtToDisplay component template
 */
export default function ArtToDisplay({ artPiece, onCreatePress, onTextPress }: ArtToDisplayProps): JSX.Element {
  return (
    <View style={styles.container}>
      <ImageLoader
        imageURL={artPiece.picture}
        imageStyle={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{artPiece.name}</Text>
        <View style={styles.buttonsContainer}>
          <Icon
            iconURI={images.icons.outline.text()}
            text='Texte'
            onPress={onTextPress}
          />
          <Icon
            iconURI={images.icons.outline.add()}
            text='Créer'
            onPress={onCreatePress}
          />
        </View>
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
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '30%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  contentContainer: {
    width: '70%',
    padding: 12,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonsContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  iconContainer: {
    backgroundColor: colors.darkGrey,
    borderRadius: 8,
    padding: 4,
  },
  icon: {
    height: 40,
    width: 40,
    tintColor: colors.accent,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
  },
})
