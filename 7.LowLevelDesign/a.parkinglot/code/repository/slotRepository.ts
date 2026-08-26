import type { ParkingSlot } from "../domain/parkingSlot.js";
import type { VehicleType } from "../domain/vehicle.js";

export class SlotRepository {

    slots: Map<string, ParkingSlot> = new Map()

    save(parkingSlot: ParkingSlot){
        this.slots.set(parkingSlot.getId(), parkingSlot)
    }

    allocateSlot(vehicleType: VehicleType) {
        const slot: ParkingSlot[] =  this.slots.values().toArray().filter(slot => slot.getSlotType() === vehicleType && slot.isSlotOccupied() === false)
        if(slot.length === 0){
            throw new Error("no vacant parking slot available.")
        }

        const slotToAllocate = slot[0]

        if(!slotToAllocate){
            throw new Error(`no slot found`)
        }
        slotToAllocate.setOccupied(true)
        return slotToAllocate
    }

    updateSlot(id: string, isOccupied: boolean){
        const slot = this.slots.get(id)
        if(!slot){
            throw new Error("no slot found")
        }
        slot.setOccupied(isOccupied)
        return slot
    }

    findAvailableSlot(vehicleType: VehicleType){
        for(const [_, slot] of this.slots.entries()){
            if(slot.getSlotType() === vehicleType && slot.isSlotOccupied() === false){
                return slot
            }
        }
        throw new Error("no vacant parking slot available.")
    }

    findSlotById(id: string){
        const slot = this.slots.get(id)
        if(!slot){
            throw new Error("no slots found")
        }
        return slot
    }
}