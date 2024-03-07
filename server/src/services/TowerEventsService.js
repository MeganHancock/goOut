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

    async updateTowerEvent(eventId, towerEventData) {
        const towerEventToUpdate = await this.getTowerEventById(eventId)
        towerEventToUpdate.description = towerEventData.description || towerEventToUpdate.description
        towerEventToUpdate.name = towerEventData.name || towerEventToUpdate.name
        // towerEventToUpdate.isCanceled = towerEventToUpdate.isCanceled == undefined ? towerEventToUpdate.isCanceled : towerEventData.isCanceled
        towerEventToUpdate.type = towerEventData.type || towerEventToUpdate.type
        towerEventToUpdate.coverImg = towerEventData.coverImg || towerEventToUpdate.coverImg
        towerEventToUpdate.location = towerEventData.location || towerEventToUpdate.location
        towerEventToUpdate.startDate = towerEventData.startDate || towerEventToUpdate.startDate
        await towerEventToUpdate.save()
        return towerEventToUpdate
    }

    async removeTowerEvent(eventId) {
        const towerEventToRemove = await this.getTowerEventById(eventId)
        await towerEventToRemove.deleteOne()
        return `${towerEventToRemove.name} has been removed.`
    }
}

export const towerEventsService = new TowerEventsService()