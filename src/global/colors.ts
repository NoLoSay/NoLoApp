/**
 * @fileoverview Colors global constants, used to style the app.
 * @module colors
 * @description Colors global constants, used to style the app.
 */

const mainColors = {
  accent: '#FDC810',
  black: '#000000',
  white: '#FFFFFF',
  dark: '#343434',
  lightGrey: '#CFCFCF',
  darkGrey: '#646464',
}

const textColors = {
  main: mainColors.dark,
  light: mainColors.lightGrey,
}

/**
 * @typedef {Object} Colors
 * @property {string} accent
 * @property {string} black
 * @property {string} white
 * @property {string} dark
 * @property {string} lightGrey
 * @property {string} darkGrey
 * @property {Object} text
 * @property {string} text.main
 * @property {string} text.light
 * @property {string} facebook
 * @property {string} google
 */
export const colors = {
  accent: mainColors.accent,
  black: mainColors.black,
  white: mainColors.white,
  dark: mainColors.dark,
  lightGrey: mainColors.lightGrey,
  darkGrey: mainColors.darkGrey,
  text: textColors,
  error: '#FF0000',
  facebook: '#3B5998',
  google: '#CBD5E1',
  apple: '#000000',
}

export default colors
