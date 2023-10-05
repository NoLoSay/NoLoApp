import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Button from '@source/components/Button'

interface ErrorPageProps {
  goBack: () => void
  errorCode: number | undefined
}

export default function ErrorPage({ goBack, errorCode }: ErrorPageProps) {
  return (
    <SafeAreaView style={styles.errorContainer}>
      <Text style={styles.errorText}>Erreur {errorCode}</Text>
      <Button
        onPress={goBack}
        text='Retour'
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '700',
  },
})
