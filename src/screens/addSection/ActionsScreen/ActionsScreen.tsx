/**
 * @fileoverview Actions screen component
 * @module ActionsScreen
 * @description Actions screen, it is the first screen that a user sees when clicking on the + tab
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colors } from '@global/colors'
import { AccountElevationEnum } from '@source/global/types/Account'
import AddContentCategory, { ContentCategoryId } from '@source/global/types/AddContentCategory'
import images from '@source/global/images'
import useActionsScreenController from './useActionsScreenController'
import ContentCategory from './Views/ContentCategory'

const CATEGORIES: AddContentCategory[] = [
  {
    id: ContentCategoryId.ADDCONTENT,
    title: 'Création de vidéo',
    subtitle: 'x vidéos à faire',
    icon: images.icons.outline.camera,
  },
  {
    id: ContentCategoryId.LIBRARY,
    title: 'Bibliothèque',
    subtitle: 'x vidéos en cours',
    icon: images.icons.outline.library,
  },
  {
    id: ContentCategoryId.COMMUNITY,
    title: 'Communauté',
    subtitle: null,
    icon: images.icons.outline.community,
    elevation: AccountElevationEnum.ADMIN,
  },
]

/**
 * @function ActionsScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function ActionsScreen(): React.JSX.Element {
  const { displayAdminCategory, onCategoryPress } = useActionsScreenController()
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.veryLightGrey,
        flex: 1,
      }}
    >
      <Text style={styles.title}>Ajouter du contenu</Text>
      <View style={styles.categoryContainer}>
        {CATEGORIES.map(
          category =>
            displayAdminCategory(category.elevation) && (
              <ContentCategory
                key={category.id}
                contentCategory={category}
                onPress={() => onCategoryPress(category.id)}
              />
            )
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.accent,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
  categoryContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
})
