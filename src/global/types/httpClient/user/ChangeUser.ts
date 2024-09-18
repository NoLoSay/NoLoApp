/**
 * @fileoverview ChangeUser type, used to define the response of the ChangeUser request.
 * @module ChangeUser
 * @description Typings for Places response.
 */

/**
 * @typedef {Object} ChangeUserJSON
 * @property {Object} json - The user object.
 * @property {string} json.username - The username of the user.
 * @property {string} json.email - The email of the user.
 * @property {string} json.telNumber - The telephone number of the user.
 * @property {number} status - The status of the response.
 * @property {string} message - The message of the response.
 */
type ChangeUserJSON = {
  json: {
    username: string
    email: string
    telNumber: string
  }
  status: number
  message: string
}

export default ChangeUserJSON
