const { response } = require('express')
const jwt = require('jsonwebtoken')
const {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} = require('../helpers/statusCodes')

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(UNAUTHORIZED).json({
      message: 'Invalid token',
    })
  }

  try {
    const seed = process.env.SECRET_JWT_SEED
    const { id, name } = jwt.verify(token, seed)

    req.id = id
    req.name = name
    next()
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Error generating token',
    })
  }
}

module.exports = {
  validateJWT,
}
