import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
    async createTicket(ticketData) {
        const newTicket = await dbContext.Tickets.create(ticketData)
        await newTicket.populate('profile', 'name picture')
        return newTicket
    }

    async getMyTickets(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId })
            .populate({
                path: 'event',
                populate: { path: 'ticketCount' }
            })
        return tickets
    }

    async getAllTicketsToOneEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
        return tickets
    }
    async removeTicket(ticketId, userId) {
        const ticketToRemove = await dbContext.Tickets.findById(ticketId)
        if (!ticketToRemove) { throw new BadRequest(`Bad Request, Invalid ID: ${ticketId}`) }
        if (ticketToRemove.accountId != userId) { throw new Forbidden('YOU CANNOT DO THAT') }
        await ticketToRemove.deleteOne()
        return 'Ticket was removed'
    }
}

export const ticketsService = new TicketsService()