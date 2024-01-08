const { NOT_FOUND } = require('../helpers/statusCodes')

const handle404Error = (_, res, next) => {
  next(
    res.status(NOT_FOUND).json({
      message: 'URL not found',
    })
  )
}

module.exports = handle404Error
