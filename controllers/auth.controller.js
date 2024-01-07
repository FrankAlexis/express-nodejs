const { response, request } = require('express')
const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  OK,
} = require('../helpers/statusCodes')
const authService = require('../services/auth.service')
const { generateJWT } = require('../helpers/jwt')
const log = require('../helpers/debug')

const createUser = async function (req, res = response) {
  const { email } = req.body

  try {
    let message = await authService.checkUserCreated(email)
    if (message) {
      return res.status(BAD_REQUEST).json({
        message,
      })
    }

    message = await authService.createUser(req.body)
    return res.status(CREATED).json({
      message,
    })
  } catch (err) {
    log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'It was not possible to create the user',
    })
  }
}

const login = async function (req = request, res = response) {
  const { email, password } = req.body

  try {
    const resp = await authService.checkLogin(email, password)

    if (typeof resp === 'string') {
      return res.status(BAD_REQUEST).json({
        message: resp,
      })
    }

    const { id, name } = resp
    const token = await generateJWT({ id, name })

    res.status(OK).json({
      id: resp.id,
      token,
    })
  } catch (err) {
    log(err)
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: 'There was an error processing your request',
    })
  }
}

const validateToken = async function (req, res = response) {
  const { id, name } = req
  const token = await generateJWT({ id, name })

  res.status(OK).json({
    token,
  })
}

module.exports = {
  createUser,
  login,
  validateToken,
}
