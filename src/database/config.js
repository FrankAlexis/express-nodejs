const { MongoClient } = require('mongoose')
const MESSAGES = require('../helpers/messages')
const log = require('../helpers/debug')

const client = new MongoClient(process.env.DB_CONNECTION, {
  serverApi: {
    strict: true,
    deprecationErrors: true,
  },
})

const dbConnection = async () => {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    )
  } catch (error) {
    log(error)
    throw new Error(MESSAGES.dbConnectionError)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

module.exports = {
  dbConnection,
}
