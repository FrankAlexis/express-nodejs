const { response } = require('express')
const { validationResult } = require('express-validator')
const { BAD_REQUEST } = require('../helpers/statusCodes')

const validateFieldSets = (req, res = response, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({
      errors: errors.mapped(),
    })
  }

  next()
}

module.exports = {
  validateFieldSets,
}
