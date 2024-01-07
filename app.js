#!/usr/bin/env node
const { dbConnection } = require('./database/config')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { NOT_FOUND } = require('./helpers/statusCodes')
require('dotenv').config()

const app = express()
const port = process.env.PORT || '3000'

dbConnection()
app.use(express.json())

// Routes
app.use('/v1/events', require('./routes/events'))
app.use('/v1/api/auth', require('./routes/auth'))

// view engine setup
app.use(express.urlencoded({ extended: false }))
app.set('port', process.env.PORT || '3000')
app.use(cookieParser())
app.use(cors())

// catch 404 and forward to error handler
app.use(function (_, res, next) {
  next(
    res.status(NOT_FOUND).json({
      message: 'URL not found',
    })
  )
})

// Server
const server = http.createServer(app)
server.listen(port)
