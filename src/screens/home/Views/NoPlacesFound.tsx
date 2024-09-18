/**
 * @fileoverview NoPlacesFound component, used to render a no places found view.
 * @description Component that is rendered if no places are found in the database.
 * @module NoPlacesFound
 * @requires react
 * @requires react-native
 */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

/**
 * @function NoPlacesFound
 * @description Component that renders a no places found view.
 * @returns {React.JSX.Element}
 */
export default function NoPlacesFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aucun lieu trouvé</Text>
      <Text style={styles.smallText}>Veuillez réessayer plus tard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  smallText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
  },
})
