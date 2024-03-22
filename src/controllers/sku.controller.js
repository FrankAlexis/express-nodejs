const { response, request } = require('express')
const { OK, INTERNAL_SERVER_ERROR } = require('../helpers/statusCodes')
const skuService = require('../services/sku.service')
const log = require('../helpers/debug')

const filterProducts = async (req = request, res = response) => {
  try {
    const query = req.params.id
    const products = await skuService.filterProducts(query)
    res.status(OK).json({ data: products })
  } catch (err) {
    log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'It was not possible to filter the products',
    })
  }
}

module.exports = {
  filterProducts,
}
