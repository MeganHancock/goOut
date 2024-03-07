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
}

export const towerEventsService = new TowerEventsService()