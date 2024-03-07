import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
    async getAllTowerEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator') //populate('ticketCount)
        return events
    }
    async createTowerEvent(towerEventData) {
        const event = await dbContext.TowerEvents.create(towerEventData)
        await event.populate('creator')//populate('ticketCount)
        return event
    }
}

export const towerEventsService = new TowerEventsService()