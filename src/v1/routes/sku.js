const express = require('express')
const { filterProducts } = require('../../controllers/sku.controller')
const router = express.Router()

router.get('/:id', filterProducts)

module.exports = router
