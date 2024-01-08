const { response } = require('express')
const {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} = require('../helpers/statusCodes')
const { verifyJWT } = require('../helpers/jwt')

const validateJWT = async (req, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(UNAUTHORIZED).json({
      message: 'Invalid token',
    })
  }

  try {
    const { id, name } = await verifyJWT(token)

    req.id = id
    req.name = name
    next()
  } catch (err) {
    return res.status(UNAUTHORIZED).json({
      message: 'Invalid token',
    })
  }
}

module.exports = {
  validateJWT,
}
