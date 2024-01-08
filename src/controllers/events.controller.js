const { response, request } = require('express')
const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('../helpers/statusCodes')
const eventService = require('../services/event.service')
const log = require('../helpers/debug')

const getEvents = async (_req, res = response) => {
  try {
    const events = await eventService.getAllEvent()
    res.status(OK).json({ events })
  } catch (err) {
    log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'It was not possible to get all events',
    })
  }
}

const getOneEvent = async (req, res = response) => {
  try {
    const eventId = req.params.id
    const event = await eventService.getEvent(eventId)
    res.status(OK).json(event)
  } catch (err) {
    log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'It was not possible to retrieve the event',
    })
  }
}

const deleteOneEvent = async (req, res = response) => {
  try {
    const { message, statusCode } = await eventService.deleteEvent(req)
    res.status(statusCode).json({
      message,
    })
  } catch (err) {
    log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'It was not possible to delete the event',
    })
  }
}

const updateOneEvent = async (req = request, res = response) => {
  try {
    const { message, statusCode } = await eventService.updateEvent(req)
    res.status(statusCode).json({
      message,
    })
  } catch (err) {
    log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'It was not possible to update the event',
    })
  }
}

const createOneEvent = async (req, res = response) => {
  try {
    req.body.user = req.id
    const event = await eventService.createEvent(req.body)
    res.status(CREATED).json({
      event,
    })
  } catch (err) {
    log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'It was not possible to create the event',
    })
  }
}

module.exports = {
  getEvents,
  getOneEvent,
  deleteOneEvent,
  updateOneEvent,
  createOneEvent,
}
