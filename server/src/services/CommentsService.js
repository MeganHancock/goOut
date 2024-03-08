import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {
    async getCommentsForEvent(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getCommentById(commentId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) throw new BadRequest('No comment with this ID')
        return comment
    }
    async removeComment(commentId, userId) {
        const commentToRemove = await this.getCommentById(commentId)
        if (commentToRemove.creatorId != userId) throw new Forbidden(`Cannot delete other user's comment`)
        await commentToRemove.deleteOne()
        return 'Comment has been removed'
    }

}

export const commentsService = new CommentsService()