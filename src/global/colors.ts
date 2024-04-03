/**
 * @fileoverview Colors global constants, used to style the app.
 * @module colors
 * @description Colors global constants, used to style the app.
 */

const mainColors = {
  nollow: '#FDC810',
  blue: '#1784E8',
  black: '#000000',
  white: '#FFFFFF',
  dark: '#343434',
  darkGrey: '#646464',
  lightGrey: '#CFCFCF',
  veryLightGrey: '#E6E6E6',
}

const textColors = {
  main: mainColors.dark,
  light: mainColors.lightGrey,
}

const systemColors = {
  cancelBlue: '#0A7AFF',
}

/**
 * @typedef {Object} Colors
 * @property {string} accent
 * @property {string} black
 * @property {string} white
 * @property {string} dark
 * @property {string} veryLightGrey
 * @property {string} lightGrey
 * @property {string} darkGrey
 * @property {Object} text
 * @property {string} text.main
 * @property {string} text.light
 * @property {string} facebook
 * @property {string} google
 * @property {string} apple
 * @property {Object} system
 * @property {String} system.cancelBlue
 */
export const colors = {
  accent: mainColors.black,
  black: mainColors.black,
  white: mainColors.white,
  dark: mainColors.dark,
  veryLightGrey: mainColors.veryLightGrey,
  lightGrey: mainColors.lightGrey,
  darkGrey: mainColors.darkGrey,
  text: textColors,
  error: '#FF0000',
  facebook: '#3B5998',
  google: '#CBD5E1',
  apple: '#000000',
  system: systemColors,
}

export default colors
