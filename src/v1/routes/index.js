const express = require('express')
const router = express.Router()

router.use('/events', require('./events'))
router.use('/auth', require('./auth'))

module.exports = router
