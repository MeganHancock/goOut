import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
    async getCommentsByEventId(eventId) {
        const response = await api.get(`/api/events/${eventId}/comments`)
        logger.log('gettin comments', response.data)
        AppState.
    }

}

export const commentsService = new CommentsService()