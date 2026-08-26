import { ParkingSlot } from "./parkingSlot.js";
import {v4 as uuidv4} from "uuid"

export class Floor{
    id: string;
    floorNumber: number;
    slots: ParkingSlot[] = []

    constructor(floorNumber: number){
        this.id = uuidv4();
        this.floorNumber = floorNumber;
    }

    setSlots(parkingSlots: ParkingSlot[]){
        this.slots = parkingSlots
    }

    setFloorNumber(floorNumber: number){
        this.floorNumber = floorNumber
    }

    addSlots(slot: ParkingSlot){
        this.slots.push(slot)
    }

    getId(){
        return this.id
    }

    getFloorNumber(){
        return this.floorNumber
    }

    getSlots(){
        return this.slots
    }
}