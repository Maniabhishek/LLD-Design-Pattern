import {v4 as uuidv4} from "uuid"
import type { ParkingSlot } from "./parkingSlot.js";

export class Ticket {
    private id: string;
    private entryTime: Date;
    private vehicleId: string;
    private parkingSlot: ParkingSlot
    private isActive: boolean;

    constructor(vehicleId: string, parkingSlot: ParkingSlot, isActive: boolean){
        this.id = uuidv4()
        this.entryTime = new Date()
        this.vehicleId = vehicleId;
        this.parkingSlot = parkingSlot;
        this.isActive = isActive
    }

    getId(){
        return this.id
    }

    setActive(isActive: boolean){
        this.isActive = isActive
    }

    getEntryTime(){
        return this.entryTime
    }

    getVehicleId(){
        return this.vehicleId
    }

    getParkingSlot(){
        return this.parkingSlot
    }

    get isTicketActive(){
        return this.isActive
    }

    set isTicketActive(isActive: boolean){
        this.isActive = isActive
    }
}