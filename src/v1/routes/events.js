/**
 * Host + /events
 */
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

router.use(validateJWT)

router.get('/', getEvents)
router.get('/:id', getOneEvent)
router.delete('/:id', deleteOneEvent)
router.put('/:id', updateOneEvent)
router.post('/', eventsValidator.eventChain, createOneEvent)

module.exports = router
