import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
    async getAllTowerEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator') //populate('ticketCount)
        return events
    }
    async createTowerEvent(towerEventData) {
        const newEvent = await dbContext.TowerEvents.create(towerEventData)
        await newEvent.populate('creator')//populate('ticketCount)
        return newEvent
    }

    async getTowerEventById(eventId) {
        const towerEvent = (await dbContext.TowerEvents.findById(eventId)).populate('creator')//populate('ticketCount)
        if (!towerEvent) throw new Error(`no event with ID: ${eventId}`)
        return towerEvent
    }
}

export const towerEventsService = new TowerEventsService()