/**
 * @fileoverview ErrorPage component, used to display an error message.
 * @module ErrorPage
 * @description This module allows to display an error message.
 * @requires react
 * @requires react-native
 */
import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Button from '@components/Button'

interface ErrorPageProps {
  goBack: () => void
  errorCode: number | undefined
}

/**
 * @function ErrorPage
 * @description Component that renders an error message.
 * @param {ErrorPageProps} props - Component props
 * @param {Function} props.goBack - Function to go back to the previous screen
 * @param {number} props.errorCode - Error code to display
 * @returns {JSX.Element}
 */
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
