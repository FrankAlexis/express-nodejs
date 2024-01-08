const { check } = require('express-validator')
const { validateFieldSets } = require('../middlewares/validateFields')

const authValidator = {
  userChain: [
    check('password', 'The password is mandatory').isLength({
      min: 6,
      max: 12,
    }),
    check('email', 'The email is not valid').isEmail(),
    validateFieldSets,
  ],
}

module.exports = authValidator
