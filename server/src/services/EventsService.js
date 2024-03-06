import { dbContext } from "../db/DbContext.js"

class EventsService {
    async getAllEvents() {
        const events = await dbContext.Events.find().populate('creator') //populate('ticketCount)
        return events
    }
    async createEvent(towerEventData) {
        const event = await dbContext.Events.create(towerEventData)
        await event.populate('creator')//populate('ticketCount)
        return event
    }
}

export const eventsService = new EventsService()