const productList = require('../../assets/sku.json')

class SkuService {
  async filterProducts(query) {
    try {
      const queryIgnoredCase = query.toLowerCase()
      const productFiltered = productList.data.filter(
        (product) =>
          product.sku.startsWith(queryIgnoredCase) ||
          product.materialName.toLowerCase().startsWith(queryIgnoredCase),
      )
      return productFiltered
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new SkuService()
