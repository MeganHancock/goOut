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
                path: 'ticket',
                populate: { path: 'ticketCount' }
            })
        return tickets
    }
}

export const ticketsService = new TicketsService()