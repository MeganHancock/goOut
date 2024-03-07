import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
    }

    async createTicket(request, response, next) {
        try {
            const ticketData = request.body
            ticketData.accountId = request.userInfo.id
            const newTicket = await ticketsService.createTicket(ticketData)
            response.send(newTicket)
        } catch (error) {
            next(error)
        }
    }




}