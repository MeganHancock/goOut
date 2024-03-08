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
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('got tickets', response.data)
        const newTickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
        AppState.ticketedEventAttendees = newTickets
    }

    async getMyTickets() {
        const response = await api.get('account/tickets')
        logger.log('got tickets', response.data)
        const newTickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
        logger.log('myTicket', newTickets)
        AppState.myTicketedEvents = newTickets
        
    }

}

export const ticketsService = new TicketsService()