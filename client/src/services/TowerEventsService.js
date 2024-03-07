import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent} from "../models/TowerEvent.js"

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

}
export const towerEventsService = new TowerEventsService()