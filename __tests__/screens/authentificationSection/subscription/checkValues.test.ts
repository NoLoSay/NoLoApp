import { emailRegex, checkValues } from '../../../../src/screens/authentificationSection/subscription/utils'

describe('checkValues', () => {
  describe('email validation', () => {
    it('should return an error message for an invalid email', () => {
      const result = checkValues('invalid-email', 'password123', 'password123', true)
      expect(result).toBe('Veuillez rentrer un email valide')
    })

    it('should not return an error for a valid email', () => {
      const result = checkValues('valid.email@example.com', 'password123', 'password123', true)
      expect(result).toBeUndefined()
    })
  })

  describe('password validation', () => {
    it('should return an error if password is too short in production', () => {
      const result = checkValues('valid.email@example.com', 'short', 'short', false)
      expect(result).toBe('Mot de passe trop court')
    })

    it('should not return an error if password is long enough', () => {
      const result = checkValues('valid.email@example.com', 'password123', 'password123', false)
      expect(result).toBeUndefined()
    })

    it('should not check password length if __DEV__ is true', () => {
      const result = checkValues('valid.email@example.com', 'short', 'short', true)
      expect(result).toBeUndefined()
    })
  })

  describe('password confirmation validation', () => {
    it('should return an error if passwords do not match', () => {
      const result = checkValues('valid.email@example.com', 'password123', 'differentPassword', false)
      expect(result).toBe('Mots de passe différents')
    })

    it('should not return an error if passwords match', () => {
      const result = checkValues('valid.email@example.com', 'password123', 'password123', false)
      expect(result).toBeUndefined()
    })
  })
})

describe('emailRegex', () => {
  it('should match valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name+tag+sorting@example.com',
      'user_name@sub.example.co.uk',
      '1234567890@example.com',
    ]
    validEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(true)
    })
  })

  it('should not match invalid email addresses', () => {
    const invalidEmails = ['plainaddress', '@missingusername.com', 'username@.com', 'username@com']
    invalidEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(false)
    })
  })
})
