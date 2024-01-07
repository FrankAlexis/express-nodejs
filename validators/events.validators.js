const { check } = require('express-validator')
const { validateFieldSets } = require('../middlewares/validateFields')
const { isDate } = require('../helpers/date')

const eventsValidator = {
  eventChain: [
    check('title', 'The title is mandatory').notEmpty(),
    check('startDate').custom(isDate),
    check('endDate').custom(isDate),
    validateFieldSets,
  ],
}

module.exports = eventsValidator
