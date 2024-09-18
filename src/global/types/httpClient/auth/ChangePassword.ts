/**
 * @fileoverview ChangePasswordJSON type, used to define the response of the change password request.
 * @module ChangePasswordJSON
 * @description Typings for change password response.
 */

/**
 * @typedef {Object} ChangePasswordJSON
 * @property {number} status - The status of the response.
 * @property {string} message - The message of the response.
 */
type ChangePasswordJSON = {
  status: number
  message: string
}

export default ChangePasswordJSON
