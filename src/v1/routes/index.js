const express = require('express')
const router = express.Router()

router
  .use('/events', require('./events'))
  .use('/auth', require('./auth'))
  .use('/skus', require('./sku'))
//router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router
