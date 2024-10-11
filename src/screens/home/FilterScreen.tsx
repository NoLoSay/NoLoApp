/**
 * @fileoverview Filter screen, used to filter videos by themes and accessibility.
 */
import Button from '@components/Button'
import colors from '@global/colors'
import images from '@global/images'
import TopBar from '@screens/VideoConsumptionView/Views/TopBar'
import React from 'react'
import { Image, ImageProps, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CategoryProps {
  icon: ImageProps
  text: string
  onPress: () => void
  isSelected: boolean
}

const THEMES = [
  {
    icon: images.icons.full.art(),
    text: 'Art',
    id: '1',
  },
  {
    icon: images.icons.full.music(),
    text: 'Musique',
    id: '2',
  },
  {
    icon: images.icons.full.hourglass(),
    text: 'Histoire',
    id: '3',
  },
  {
    icon: images.icons.full.sciences(),
    text: 'Sciences',
    id: '4',
  },
  {
    icon: images.icons.full.sports(),
    text: 'Sport',
    id: '5',
  },
]

const ACCESSIBILITY = [
  {
    icon: images.logos.heart(),
    text: 'NoLoSay',
    id: '1',
  },
  {
    icon: images.icons.outline.deaf(),
    text: 'Handicap Auditif',
    id: '2',
  },
  {
    icon: images.icons.outline.blind(),
    text: 'Handicap Visuel',
    id: '3',
  },
  {
    icon: images.icons.outline.disabled(),
    text: 'Handicap Moteur',
    id: '4',
  },
  {
    icon: images.icons.outline.other(),
    text: 'Handicap Autre',
    id: '5',
  },
]

/**
 * @function Category - Category component
 * @description Category component used to display a category with an icon and a text
 * @param props - Component props
 * @param {ImageProps} props.icon - Icon of the category
 * @param {string} props.text - Text of the category
 * @param {Function} props.onPress - Function to call when the category is pressed
 * @param {boolean} props.isSelected - Wether the category is selected or not
 * @returns {JSX.Element} Category component template
 */
function Category({ icon, text, onPress, isSelected }: CategoryProps): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, isSelected ? { backgroundColor: '#FDC81037' } : {}]}>
        <Image
          source={icon}
          style={[
            styles.icon,
            text !== 'NoLoSay'
              ? {
                  tintColor: colors.accent,
                }
              : {},
          ]}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

/**
 * @function FilterScreen - Filter screen component
 * @description Filter screen component used to filter videos by themes and accessibility
 * @param props - Component props
 * @param {Function} props.navigation - Navigation object
 * @returns {JSX.Element} Filter screen component template
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FilterScreen({ navigation, route }: any): JSX.Element {
  const [selectedThemes, setSelectedThemes] = React.useState<number[]>([])
  const [selectedAccessibility, setSelectedAccessibility] = React.useState<number[]>([])
  const { userCity, setCity, mutationToApply } = route.params

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        title='Filtres'
        navigation={navigation}
      />
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 8,
          flex: 1,
        }}
      >
        <Text style={styles.title}>Thèmes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ overflow: 'visible', flex: 1 }}
        >
          {THEMES.map(category => (
            <Category
              key={category.id}
              icon={category.icon}
              text={category.text}
              onPress={() => {
                if (selectedThemes.includes(parseInt(category.id))) {
                  setSelectedThemes(selectedThemes.filter(theme => theme !== parseInt(category.id)))
                } else {
                  setSelectedThemes([...selectedThemes, parseInt(category.id)])
                }
              }}
              isSelected={selectedThemes.includes(parseInt(category.id))}
            />
          ))}
        </ScrollView>
        <Text style={[styles.title, { marginTop: 8 }]}>Accessibilité</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ overflow: 'visible', flex: 1 }}
        >
          {ACCESSIBILITY.map(category => (
            <Category
              key={category.id}
              icon={category.icon}
              text={category.text}
              onPress={() => {
                if (selectedAccessibility.includes(parseInt(category.id))) {
                  setSelectedAccessibility(selectedAccessibility.filter(theme => theme !== parseInt(category.id)))
                } else {
                  setSelectedAccessibility([...selectedAccessibility, parseInt(category.id)])
                }
              }}
              isSelected={selectedAccessibility.includes(parseInt(category.id))}
            />
          ))}
        </ScrollView>
        <View style={{ flex: 3, justifyContent: 'flex-end', marginBottom: 42 }}>
          <Button
            text='Valider la sélection'
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
          />
          <Button
            text='Réinitialiser les filtres'
            onPress={() => {
              setSelectedThemes([])
              setSelectedAccessibility([])
              setCity(userCity)
              mutationToApply()
              navigation.goBack()
            }}
            style={{ marginTop: 8, backgroundColor: 'transparent', borderColor: colors.accent, borderWidth: 2 }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: colors.darkGrey,
    overflow: 'hidden',
    textDecorationColor: colors.accent,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    marginBottom: 14,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: 80,
    height: 80,
    marginRight: 14,
  },
  iconContainer: {
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 9,
  },
  icon: {
    height: 42,
    width: 42,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
  },
})
