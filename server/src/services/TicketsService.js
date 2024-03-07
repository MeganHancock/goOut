import { dbContext } from "../db/DbContext.js"

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
}

export const ticketsService = new TicketsService()