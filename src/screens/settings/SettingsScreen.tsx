/**
 * @fileoverview Settings screen component
 * @module SettingsScreen
 * @description Settings screen, it is the screen that the user will use to change his preferences.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import { colors } from '@global/colors'
import images from '@source/global/images'
import useSettingsScreenController from './useSettingsScreenController'
import TopBar from './Views/TopBar'
import MainInfos from './Views/MainInfos'
import ModalView from './ModalModule/ModalView'
import SettingCategoryDisplay from './Views/SettingCategoryDisplay'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function SettingsScreen
 * @description Component that renders the Settings screen.
 * @returns {React.JSX.Element} App component template
 */
export default function SettingsScreen({ navigation }: Props): React.JSX.Element {
  const {
    account,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    isModalVisible,
    showModal,
    hideModal,
    isBiometryEnabled,
    toggleBiometry,
    logoutUser,
  } = useSettingsScreenController({ navigation })

  type SettingsCategory = {
    id: number
    title: string
    subtitle?: string
    onPress?: () => void
    icon?: React.ReactNode
    childrenIcon?: React.ReactNode
    backIconColor?: string
    iconColor?: string
  }

  /**
   * @constant MainSettingsCategories
   * @description The main settings categories
   * @type {SettingsCategory[]} The main settings categories
   * @property {number} id The id of the category
   * @property {string} title The title of the category
   * @property {string} subtitle The subtitle of the category
   * @property {() => void} onPress The function that is called when the category is pressed
   * @property {React.ReactNode} icon The icon of the category
   * @property {React.ReactNode} childrenIcon The icon of the category's children
   * @property {string} backIconColor The color of the back icon
   * @property {string} iconColor The color of the icon
   */
  const MainSettingsCategories: SettingsCategory[] = [
    {
      id: 1,
      title: 'Mon compte',
      subtitle: 'Faire des changements sur mon compte',
      onPress: () => console.log('account settings'),
      icon: images.icons.twoTones.profile(),
    },
    {
      id: 2,
      title: 'Biométrie',
      subtitle: 'Se connecter avec des données biométriques',
      icon: images.icons.twoTones.lock(),
      childrenIcon: (
        <Switch
          trackColor={{ false: colors.veryLightGrey, true: colors.accent }}
          thumbColor={colors.white}
          ios_backgroundColor={colors.veryLightGrey}
          onValueChange={toggleBiometry}
          value={isBiometryEnabled}
        />
      ),
    },
    {
      id: 3,
      title: 'Se déconnecter',
      onPress: logoutUser,
      backIconColor: colors.veryLightGrey,
      iconColor: colors.darkGrey,
      icon: images.icons.twoTones.logout(),
    },
  ]

  /**
   * @constant MoreSettingsCategories
   * @description The additional settings categories
   * @type {SettingsCategory[]} The main settings categories
   * @property {number} id The id of the category
   * @property {string} title The title of the category
   * @property {string} subtitle The subtitle of the category
   * @property {() => void} onPress The function that is called when the category is pressed
   * @property {React.ReactNode} icon The icon of the category
   * @property {React.ReactNode} childrenIcon The icon of the category's children
   * @property {string} backIconColor The color of the back icon
   * @property {string} iconColor The color of the icon
   */
  const MoreSettingsCategories: SettingsCategory[] = [
    {
      id: 4,
      title: 'Aide et support',
      onPress: () => console.log('Help and support'),
      icon: images.icons.twoTones.bell(),
    },
    {
      id: 5,
      title: "À propos de l'application",
      onPress: () => console.log('About the app'),
      icon: images.icons.twoTones.heart(),
    },
    {
      id: 6,
      title: 'CGU',
      onPress: () => console.log('CGU'),
      icon: images.icons.outline.contract(),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView style={styles.scrollview}>
        <MainInfos
          accountImage={account.image}
          firstName={firstName}
          lastName={lastName}
          username={username}
          showModal={showModal}
        />
        <View style={styles.settingsCategoriesContainer}>
          {MainSettingsCategories.map(category => (
            <SettingCategoryDisplay
              id={category.id}
              title={category.title}
              subtitle={category.subtitle}
              onPress={category.onPress}
              icon={category.icon}
              childrenIcon={category.childrenIcon}
              backIconColor={category.backIconColor}
              iconColor={category.iconColor}
            />
          ))}
        </View>
        <Text style={styles.moreText}>Plus</Text>
        <View style={styles.settingsCategoriesContainer}>
          {MoreSettingsCategories.map(category => (
            <SettingCategoryDisplay
              id={category.id}
              title={category.title}
              subtitle={category.subtitle}
              onPress={category.onPress}
              icon={category.icon}
              childrenIcon={category.childrenIcon}
              backIconColor={category.backIconColor}
              iconColor={category.iconColor}
            />
          ))}
        </View>
      </ScrollView>
      <ModalView
        account={account}
        hideModal={hideModal}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setUsername={setUsername}
        isVisible={isModalVisible}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.veryLightGrey,
    flex: 1,
    paddingHorizontal: '10%',
  },
  scrollview: {
    paddingHorizontal: 16,
  },
  settingsCategoriesContainer: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  moreText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 32,
  },
})
