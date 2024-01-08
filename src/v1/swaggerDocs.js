const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Calendar Events API', version: '1.0.0' },
  },
  explorer: true,
  basePath: '/',
  apis: ['./src/v1/docs/*'],
}

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options)

const swaggerDocument = yaml.load('./swagger.yaml') //Ruta archivo Swagger

module.exports = { swaggerSpec, swaggerUi, swaggerDocument }
