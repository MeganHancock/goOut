import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from '../models/Comment.js';


class CommentsService{
    async getCommentsByEventId(eventId) {
        const response = await api.get(`/api/events/${eventId}/comments`)
        logger.log('gettin comments', response.data)
        AppState.comments = response.data.map(comment => new Comment(comment))
    }

}

export const commentsService = new CommentsService()