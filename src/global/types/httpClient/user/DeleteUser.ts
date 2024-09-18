/**
 * @fileoverview DeleteUser type, used to define the response of the DeleteUser request.
 * @module DeleteUser
 * @description Typings for DeleteUser response.
 */

/**
 * @typedef {Object} DeleteUserJSON
 * @property {number} status - The status of the response.
 * @property {string} message - The message of the response.
 */
type DeleteUserJSON = {
  status: number
  message: string
}

export default DeleteUserJSON
