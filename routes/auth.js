/**
 * Host + /api/auth
 */
const express = require('express')
const router = express.Router()
const {
  createUser,
  login,
  validateToken,
} = require('../controllers/auth.controller')
const { validateJWT } = require('../middlewares/validateJWT')
const authValidator = require('../validators/auth.validators')

router.post('/new', authValidator.userChain, createUser)
router.post('/login', authValidator.userChain, login)
router.get('/renew', validateJWT, validateToken)

module.exports = router
