/**
 * @fileoverview Connection type, used to define the response of the connection request.
 * @module Connection
 * @description Typings for connection response.
 */

/**
 * @typedef {Object} ConnectJSON
 * @property {Object} json - The user object.
 * @property {number} json.id - The id of the user.
 * @property {string} json.uuid - The uuid of the user.
 * @property {string} json.username - The username of the user.
 * @property {string} json.email - The email of the user.
 * @property {string} json.picture - The picture of the user.
 * @property {string} json.telNumber - The telephone number of the user.
 * @property {string} json.role - The role of the user.
 * @property {string} json.accessToken - The access token of the user.
 * @property {string} json.createdAt - The creation date of the user.
 * @property {number} status - The status of the response.
 * @property {string} message - The message of the response.
 */
type ConnectJSON = {
  json: {
    id: number
    uuid: string
    username: string
    email: string
    picture: string | null
    telNumber: string | null
    role: string
    accessToken: string
    createdAt: string
  }
  status: number
  message: string
}

export default ConnectJSON
