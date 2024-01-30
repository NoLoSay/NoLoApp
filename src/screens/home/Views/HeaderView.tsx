/**
 * @fileoverview Header View of the homescreen
 * @module HeaderView
 * @description Header view, it contains the logo, the city name, the search bar and the settings button.
 * @requires react react-native
 */

import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import images from '../../../global/images'
import colors from '../../../global/colors'

interface HeaderViewProps {
  city: string
  page: 'map' | 'carousel'
  displaySearchBar: boolean
  toggleSearchBar: () => void
  togglePage: () => void
  searchValue: string
  setSearchValue: (value: string) => void
  navigation: any
}

/**
 * @function HeaderView
 * @description Component that renders the header view.
 * @param city The city of the user
 * @param page The current page of the screen
 * @param displaySearchBar The display state of the search bar
 * @param toggleSearchBar The function to toggle the search bar
 * @param togglePage The function to toggle the current page of the screen
 * @param searchValue The value of the search bar
 * @param setSearchValue The function to set the value of the search bar
 * @param navigation Navigation object
 * @returns {React.JSX.Element}
 */
export default function HeaderView({
  city,
  page,
  displaySearchBar,
  toggleSearchBar,
  togglePage,
  searchValue,
  setSearchValue,
  navigation,
}: HeaderViewProps): React.JSX.Element {
  const updateText = (val: string) => {
    setSearchValue(val)
  }

  /**
   * @function defaultView
   * @description The default view of the header
   * @returns {React.JSX.Element} The default view of the header
   */
  function defaultView(): React.JSX.Element {
    return (
      <>
        <View style={styles.defaultViewContainer}>
          <TouchableOpacity onPress={togglePage}>
            <Image
              source={page === 'map' ? images.icons.outline.carousel() : images.icons.outline.mapArrow()}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.cityText}>{city.length > 8 ? `${city.substring(0, 5)}...` : city}</Text>
        </View>
        <Image
          source={images.logos.nolosay()}
          style={styles.logo}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={toggleSearchBar}>
            <Image
              source={images.icons.outline.magnifier()}
              style={[styles.icon, { marginRight: 20 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsModal')}>
            <Image
              source={images.icons.outline.menu()}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </>
    )
  }

  /**
   * @function searchView
   * @description The search view of the header
   * @returns {React.JSX.Element}
   */
  function searchView(): React.JSX.Element {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Rechercher'
          value={searchValue}
          onChangeText={updateText}
          placeholderTextColor={colors.lightGrey}
        />
        <TouchableOpacity
          onPress={toggleSearchBar}
          style={styles.cancelButton}
          activeOpacity={0.5}
        >
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.headerView}>
      {!displaySearchBar && defaultView()}
      {displaySearchBar && searchView()}
    </View>
  )
}

const styles = StyleSheet.create({
  defaultViewContainer: {
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cancelText: {
    color: colors.system.cancelBlue,
    fontSize: 14,
  },
  logo: {
    width: '40%',
    aspectRatio: 2.46,
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: colors.black,
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: colors.black,
    marginLeft: 8,
  },
  input: {
    height: 40,
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginRight: 8,
    width: '85%',
  },
  cancelButton: {
    width: '15%',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: colors.system.cancelBlue,
  },
})
