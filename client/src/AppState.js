import { reactive } from 'vue'
// eslint-disable-next-line no-unused-vars
import { TowerEvent } from './models/TowerEvent.js'
// eslint-disable-next-line no-unused-vars
import { Ticket } from './models/Ticket.js'
// eslint-disable-next-line no-unused-vars
import { Comment } from './models/Comment.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  // @ts-ignore
  account: {},
  
  
  /** @type {TowerEvent[]} */
  towerEvents: [],
  
  /** @type {TowerEvent} */
  activeTowerEvent: null,  
  
  /** @type {Ticket[]} */
  ticketedEventAttendees: [],

  /** @type {Ticket[]} */
  myTicketedEvents: [],
  
  /** @type {Ticket[]} */
  activeTicket: null,
  
  /** @type {Comment[]} */
  comments: []
})
