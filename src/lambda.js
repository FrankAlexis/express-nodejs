require('source-map-support/register')
const serverlessExpress = require('@codegenie/serverless-express')
const { dbConnection } = require('./database/config')
const app = require('./app')

let serverlessExpressInstance

async function setup(event, context) {
  await dbConnection()
  serverlessExpressInstance = serverlessExpress({ app })
  return serverlessExpressInstance(event, context)
}

function handler(event, context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context)

  return setup(event, context)
}

exports.handler = handler
