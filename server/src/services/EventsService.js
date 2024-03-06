import { dbContext } from "../db/DbContext.js"

class EventsService {
    async createEvent(towerEventData) {
        const event = await dbContext.Events.create(towerEventData)
        await event.populate('creator')
        // await event.populate('ticketCount')
        return event
    }
}

export const eventsService = new EventsService()