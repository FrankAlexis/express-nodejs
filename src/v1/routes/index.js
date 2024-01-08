const express = require('express')
const { swaggerUi, swaggerSpec } = require('../swaggerDocs')
const router = express.Router()

router.use('/events', require('./events'))
router.use('/auth', require('./auth'))
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router
