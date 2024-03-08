import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";
import { CommentSchema } from "../models/Comment.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .get('/:eventId/tickets', this.getAllTicketsToOneEvent)
            .get('/:eventId/comments', this.getCommentsForEvent)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:eventId', this.updateTowerEvent)
            .delete('/:eventId', this.cancelTowerEvent)
    }

    async createTowerEvent(request, response, next) {
        try {
            const eventData = request.body
            eventData.creatorId = request.userInfo.id
            const newEvent = await towerEventsService.createTowerEvent(eventData)
            response.send(newEvent)
        } catch (error) {
            next(error)
        }
    }

    async getAllTowerEvents(request, response, next) {
        try {
            const events = await towerEventsService.getAllTowerEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getTowerEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const towerEvent = await towerEventsService.getTowerEventById(eventId)
            response.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async updateTowerEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const towerEventData = request.body
            const updatedTowerEvent = await towerEventsService.updateTowerEvent(eventId, towerEventData, userId)
            response.send(updatedTowerEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelTowerEvent(request, response, next) {
        try {
            const userId = request.userInfo.id
            const eventId = request.params.eventId
            const message = await towerEventsService.cancelTowerEvent(eventId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getAllTicketsToOneEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketsService.getAllTicketsToOneEvent(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsForEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentsService.getCommentsForEvent(eventId)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }


}