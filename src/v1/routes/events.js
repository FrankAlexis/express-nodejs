const express = require('express')
const { validateJWT } = require('../../middlewares/validateJWT')
const {
  getEvents,
  getOneEvent,
  deleteOneEvent,
  updateOneEvent,
  createOneEvent,
} = require('../../controllers/events.controller')
const eventsValidator = require('../../validators/events.validators')
const router = express.Router()

router
  .use(validateJWT)
  .get('/', getEvents)
  .get('/:id', getOneEvent)
  .delete('/:id', deleteOneEvent)
  .put('/:id', updateOneEvent)
  .post('/', eventsValidator.eventChain, createOneEvent)

module.exports = router
