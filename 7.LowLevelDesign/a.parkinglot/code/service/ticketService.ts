import type { ParkingSlot } from "../domain/parkingSlot.js";
import { Ticket } from "../domain/ticket.js";
import type { Vehicle } from "../domain/vehicle.js";
import type { TicketRepository } from "../repository/ticketRepository.js";

export class TicketService {
    private ticketRepository: TicketRepository;
    constructor(ticketRepository: TicketRepository){
        this.ticketRepository = ticketRepository;
    }

    generateTicket(vehicle: Vehicle, parkingSlot: ParkingSlot){
        console.log('[SERVICE] Generating ticket')
        const ticket = new Ticket(vehicle.getId(), parkingSlot, true)
        this.ticketRepository.save(ticket)
        console.log('[SERVICE] Ticket generated successfully')
        return ticket;
    }

    getTicket(ticketId: string){
        console.log('[SERVICE] Fetching ticket');
        return this.ticketRepository.findTicketById(ticketId)
    }

    deactivateTicket(ticketId: string){
        console.log('[SERVICE] Deactivating ticket');
        this.ticketRepository.deactivateTicket(ticketId)
        console.log('[SERVICE] Ticket deactivated successfully');
    }
}