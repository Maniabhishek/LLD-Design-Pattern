import { VehicleType } from "./vehicle.js";
import  { v4 as uuidv4 } from "uuid"

export class ParkingSlot{
    private id: string;
    private slotType: VehicleType;
    private isOccupied: boolean;
    private floorNumber: number;


    constructor(vehicleType: VehicleType, floorNumber: number){
        this.id = uuidv4()
        this.slotType = vehicleType
        this.isOccupied = false
        this.floorNumber = floorNumber
    }

    getId(){
        return this.id
    }

    getSlotType(){
        return this.slotType
    }

    isSlotOccupied(){
        return this.isOccupied
    }

    getFloorNumber(){
        return this.floorNumber
    }

    setOccupied(isOccupied: boolean){
        this.isOccupied = isOccupied
    }
}