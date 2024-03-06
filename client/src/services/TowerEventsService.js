import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent} from "../models/TowerEvent.js"

class TowerEventsService{
 async getTowerEvents() {
    const response = await api.get('api/events')
AppState.towerEvents = response.data.map(towerEventPOJO => new TowerEvent(towerEventPOJO))
logger.log('found events mapped', AppState.towerEvents)
}

}
export const towerEventsService = new TowerEventsService()