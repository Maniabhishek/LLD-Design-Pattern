import type { Ticket } from "../domain/ticket.js";

export class TicketRepository {
    private tickets: Record<string, Ticket> = {}

    save(ticket: Ticket){
        this.tickets[ticket.getId()] = ticket
    }

    findTicketById(id: string){
        if(!this.tickets[id]) throw new Error(`ticket not found with id ${id}`)
        return this.tickets[id]
    }

    findActiveTickets(){
        const activeTickets: Ticket[] = []
        for(const ticket of Object.values(this.tickets)){
            if(ticket.isTicketActive) {
                activeTickets.push(ticket)
            }
        }
        return activeTickets
    }

    deactivateTicket(ticketid: string){
        const ticket = this.tickets[ticketid]
        if(!ticket) throw new Error(`no ticket found with the id: ${ticketid}`)
        ticket.setActive(false)
    }

    clear(){
        for (const id of Object.keys(this.tickets)) {
            delete this.tickets[id]
        }
    }
}