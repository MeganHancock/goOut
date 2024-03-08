import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { commentsService } from "../services/CommentsService.js"

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('/:commentId', this.getCommentById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.removeComment)
    }

    async createComment(request, response, next) {
        try {
            const commentData = request.body
            commentData.creatorId = request.userInfo.id
            const comment = await commentsService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async getCommentById(request, response, next) {
        try {
            const commentId = request.params.commentId
            const foundComment = await commentsService.getCommentById(commentId)
            response.send(foundComment)
        } catch (error) {
            next(error)
        }
    }

    async removeComment(request, response, next) {
        try {
            const userId = request.userInfo.id
            const commentId = request.params.commentId
            const message = await commentsService.removeComment(commentId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
}