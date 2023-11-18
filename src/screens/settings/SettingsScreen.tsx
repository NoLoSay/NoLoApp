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
        <View style={{ marginTop: 32, borderRadius: 8, backgroundColor: colors.white }}>
          <SettingCategoryDisplay
            title='Mon compte'
            subtitle='Faire des changements sur mon compte'
            onPress={() => console.log('account settings')}
            icon={images.icons.twoTones.profile()}
          />
          <SettingCategoryDisplay
            title='Biométrie'
            subtitle='Se connecter avec des données biométriques'
            icon={images.icons.twoTones.lock()}
            childrenIcon={
              <Switch
                trackColor={{ false: colors.veryLightGrey, true: colors.accent }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.veryLightGrey}
                onValueChange={toggleBiometry}
                value={isBiometryEnabled}
              />
            }
          />
          <SettingCategoryDisplay
            title='Se déconnecter'
            onPress={logoutUser}
            backIconColor={colors.veryLightGrey}
            iconColor={colors.darkGrey}
            icon={images.icons.twoTones.logout()}
          />
        </View>
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '500', marginTop: 32 }}>Plus</Text>
        <View style={{ marginTop: 16, borderRadius: 8, backgroundColor: colors.white }}>
          <SettingCategoryDisplay
            title='Aide et support'
            onPress={() => console.log('Help and support')}
            icon={images.icons.twoTones.bell()}
          />
          <SettingCategoryDisplay
            title="À propos de l'application"
            onPress={() => console.log('About the app')}
            icon={images.icons.twoTones.heart()}
          />
          <SettingCategoryDisplay
            title='CGU'
            onPress={() => console.log('CGU')}
            icon={images.icons.outline.contract()}
          />
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
})
