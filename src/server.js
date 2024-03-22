#!/usr/bin/env node
const handle404Error = require('./middlewares/handle404Error')
const { dbConnection } = require('./database/config')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const http = require('http')

require('dotenv').config()

dbConnection()

const app = express()
app.use(express.json())

// Routes
app.use('/api/v1', require('./v1/routes/index'))

// view engine setup
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(handle404Error)
app.use(cors())

// Server
const server = http.createServer(app)
server.listen(process.env.PORT || '4000')
