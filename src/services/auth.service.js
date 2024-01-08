const User = require('../models/User.model')
const { encrypt, decrypt } = require('../helpers/encrypt')

class AuthService {
  async checkUserCreated(email) {
    try {
      const user = await this.findUser(email)

      if (user) {
        return 'There is an user with that email'
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async checkLogin(email, password) {
    try {
      const user = await this.findUser(email)
      if (!user) {
        return 'User not found. Please check your email and password.'
      }

      const isValidPassword = decrypt(password, user.password)
      if (!isValidPassword) {
        return 'User not found. Please check your email and password.'
      }

      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async createUser(userInformation) {
    try {
      userInformation.password = encrypt(userInformation.password)
      const user = new User(userInformation)
      await user.save()

      return 'User created'
    } catch (err) {
      throw new Error(err)
    }
  }

  async findUser(email) {
    try {
      const user = await User.findOne({ email })
      return user
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new AuthService()
