import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
