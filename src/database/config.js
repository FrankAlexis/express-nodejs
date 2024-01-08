const { connect } = require('mongoose')
const MESSAGES = require('../helpers/messages')
const log = require('../helpers/debug')

const dbConnection = async () => {
  try {
    await connect(process.env.DB_CONNECTION)
  } catch (error) {
    log(error)
    throw new Error(MESSAGES.dbConnectionError)
  }
}

module.exports = {
  dbConnection,
}
