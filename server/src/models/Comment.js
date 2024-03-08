import { Schema } from "mongoose"


export const CommentSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.ObjectId, required: true, ref: 'TowerEvent' },
    body: { type: String, minLength: 3, maxLength: 500, required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})