import { ParkingSlot } from "../domain/parkingSlot.js";
import type { VehicleType } from "../domain/vehicle.js";
import type { SlotRepository } from "../repository/slotRepository.js";

export class SlotService {
    slotRepository: SlotRepository
    constructor(slotRepository: SlotRepository){
        this.slotRepository = slotRepository
    }

    createSlot(vehicleType: VehicleType, floorNumber: number){
        const slot = new ParkingSlot(vehicleType, floorNumber)
        this.slotRepository.save(slot)
    }

    allocateSlot(vehicleType: VehicleType){
        try {
            const slot = this.slotRepository.allocateSlot(vehicleType)
            if(!slot.isSlotOccupied()){
                throw new Error("something went wrong")
            }
            return slot
        } catch (error: any) {
            console.log(error)
            return error?.message
        }
    }

    releaseSlot(id: string){
        try {
            const slot = this.slotRepository.updateSlot(id, false)
            if(slot.isSlotOccupied()){
                throw new Error("something went wrong")
            }
            return slot
        } catch (error: any) {
            throw new Error(error?.message)
        }
    }

    getAvailableSlots(vehicleType: VehicleType){
        this.slotRepository.findAvailableSlot(vehicleType)
    }
}