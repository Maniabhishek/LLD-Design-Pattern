import { Vehicle, type VehicleType } from "../domain/vehicle.js";
import type { SlotService } from "../service/slotService.js";
import type { TicketService } from "../service/ticketService.js";

export class EntryController {
    ticketService: TicketService;
    slotService: SlotService;
    constructor(ticketService: TicketService, slotService: SlotService){
        this.ticketService = ticketService;
        this.slotService = slotService;
    }

    enterVehicle(vehicleType: VehicleType, licensePlate: string) {
        try {
            const vehicle = new Vehicle(licensePlate, vehicleType)
    
            const slot = this.slotService.allocateSlot(vehicleType)
    
            const ticket = this.ticketService.generateTicket(vehicle, slot)
            return ticket
        } catch (error) {
           console.log(error); 
        }
    }
}