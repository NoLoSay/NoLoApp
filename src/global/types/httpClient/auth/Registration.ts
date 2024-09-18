/**
 * @fileoverview Registration type, used to define the response of the Registration request.
 * @module Registration
 * @description Typings for Registration response.
 */

/**
 * @typedef {Object} RegisterJSON
 * @property {Object} json - The user object.
 * @property {string} json.username - The username of the user.
 * @property {string} json.email - The email of the user.
 * @property {number} status - The status of the response.
 * @property {string} message - The message of the response.
 */
type RegisterJSON = {
  json: {
    username: string
    email: string
  }
  status: number
  message: string
}

export default RegisterJSON
