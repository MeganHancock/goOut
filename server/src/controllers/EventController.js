import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
    }

    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            eventData.creatorId = request.userInfo.id
            const newTowerEvent = await eventsService.createEvent(eventData)
            response.send(newTowerEvent)
        } catch (error) {
            next(error)
        }
    }

}