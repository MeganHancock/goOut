import { AppState } from '../AppState.js';
import { Ticket } from '../models/Ticket.js';
import { logger } from '../utils/Logger.js';
import { api } from './AxiosService.js';

class TicketsService {
    async createTicket(eventData) {
        const response = await api.post('api/tickets', eventData)
        logger.log('tickets service', response.data)        
        AppState.ticketedEventAttendees.push(new Ticket(response.data))
        logger.log('new ticketed attendee', AppState.ticketedEventAttendees)
    }

    async getTicketsByEventId(eventId){
        logger.log('build out back end')

    }

}

export const ticketsService = new TicketsService()