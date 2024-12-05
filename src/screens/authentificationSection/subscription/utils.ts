export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/**
 * @function checkValues
 * @description Check if the email, password, and password confirmation are valid.
 * @param email The email
 * @param password The password
 * @param passwordConfirmation The password confirmation
 * @param isDev Boolean to check if the app is in development mode
 * @returns a string if there is an error, undefined otherwise
 */
export function checkValues(
  email: string,
  password: string,
  passwordConfirmation: string,
  isDev: boolean
): string | undefined {
  if (emailRegex.test(email) === false) {
    return 'Veuillez rentrer un email valide'
  }
  if (!isDev && password.length < 8) {
    return 'Mot de passe trop court'
  }
  if (password !== passwordConfirmation) {
    return 'Mots de passe différents'
  }
  return undefined
}
