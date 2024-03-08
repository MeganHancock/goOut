import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from '../models/Comment.js';
import App from "../App.vue";


class CommentsService{
    async getCommentsByEventId(eventId) {
        const response = await api.get(`/api/events/${eventId}/comments`)
        logger.log('gettin comments', response.data)
        AppState.comments = response.data.map(comment => new Comment(comment))
    }

    async postComment(commentData){
        const response = await api.post('api/comments', commentData)
        logger.log('posting comment', response.data)
        const newComment = new Comment(response.data)
        AppState.comments.unshift(newComment)
    }

}

export const commentsService = new CommentsService()