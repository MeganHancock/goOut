import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent} from "../models/TowerEvent.js"
import { Ticket } from "../models/Ticket.js"

class TowerEventsService{
    async getTowerEvents() {
        const response = await api.get('api/events')
        AppState.towerEvents = response.data.map(towerEventPOJO => new TowerEvent(towerEventPOJO))
        // logger.log('found events mapped', AppState.towerEvents)
    }
    
    async createTowerEvent(newTowerEventData){
        const response = await api.post('api/events', newTowerEventData)
        logger.log('new event', response.data)
        const newTowerEvent = new TowerEvent(response.data)
        AppState.towerEvents.push(newTowerEvent)
        return newTowerEvent
    }
    
    async getTowerEventById(eventId) {
        AppState.activeTowerEvent = null 
        const response = await api.get(`api/events/${eventId}`)
        logger.log('getting event by id', response.data)
        AppState.activeTowerEvent = new TowerEvent(response.data)
    }
    
    async cancelTowerEvent(eventId) {
        const response = await api.delete(`api/events/${eventId}`)
        logger.log('canceled event', response.data)
        AppState.activeTowerEvent.isCanceled = true
    }




}
export const towerEventsService = new TowerEventsService()