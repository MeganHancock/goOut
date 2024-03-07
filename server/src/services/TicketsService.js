import { dbContext } from "../db/DbContext.js"

class TicketsService {
    async createTicket(ticketData) {
        const newTicket = await dbContext.Tickets.create(ticketData)
        await newTicket.populate('profile', 'name picture')
        return newTicket
    }

}

export const ticketsService = new TicketsService()