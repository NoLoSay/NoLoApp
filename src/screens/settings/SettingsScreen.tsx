/**
 * @fileoverview Settings screen component
 * @module SettingsScreen
 * @description Settings screen, it is the screen that the user will use to change his preferences.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { colors } from '@global/colors'
import useSettingsScreenController from './useSettingsScreenController'
import TopBar from './Views/TopBar'
import MainInfos from './Views/MainInfos'
import ModalView from './ModalModule/ModalView'

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
  } = useSettingsScreenController()

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
