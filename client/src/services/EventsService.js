import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService{
 async getEvents() {
    const response = await api.get('api/events')
    // logger.log('got events', response.data)
    AppState.events = response.data.map(eventPOJO => new Event(eventPOJO))
}
}

export const eventsService = new EventsService()