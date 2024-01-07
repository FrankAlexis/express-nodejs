const { NOT_FOUND, CREATED, BAD_REQUEST } = require('../helpers/statusCodes')
const Event = require('../models/Event.model')

class EventService {
  async createEvent(eventInformation) {
    try {
      const event = await new Event(eventInformation).save()
      return event
    } catch (err) {
      throw new Error(err)
    }
  }

  async getAllEvent() {
    try {
      const events = await Event.find().populate('user', 'name email')
      return events
    } catch (err) {
      throw new Error(err)
    }
  }

  isTheOwner(event, userId) {
    if (event.user.id !== userId) {
      return {
        message: 'The user is not allowed to modify the event',
        statusCode: BAD_REQUEST,
      }
    }
    return true
  }

  async getEvent(eventId) {
    try {
      const eventFound = await Event.findById(eventId)

      if (!eventFound) {
        return {
          message: 'The event was not found',
          statusCode: NOT_FOUND,
        }
      }
      return eventFound
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateEvent(req) {
    const eventId = req.params.id
    const userId = req.id

    try {
      const eventFound = await this.getEvent(eventId)

      if (eventFound?.message) {
        return eventFound
      }

      const isAllowedToUpdate = this.isTheOwner(eventFound, userId)

      if (!isAllowedToUpdate) {
        return isAllowedToUpdate
      }

      const newEvent = { ...req.body, user: userId }
      await Event.findByIdAndUpdate(eventId, newEvent, {
        new: true,
      })
      return {
        message: 'The event was updated successfully',
        statusCode: CREATED,
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteEvent(req) {
    const eventId = req.params.id
    const userId = req.id

    try {
      const eventFound = await this.getEvent(eventId)

      if (eventFound?.message) {
        return eventFound
      }

      const isAllowedToUpdate = this.isTheOwner(eventFound, userId)

      if (!isAllowedToUpdate) {
        return isAllowedToUpdate
      }

      await Event.findByIdAndDelete(eventId)
      return {
        message: 'The event was deleted successfully',
        statusCode: CREATED,
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new EventService()
