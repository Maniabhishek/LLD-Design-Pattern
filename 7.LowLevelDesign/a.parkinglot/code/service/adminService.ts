import { Floor } from "../domain/floor.js";
import { ParkingSlot } from "../domain/parkingSlot.js";
import { PricingRule, PricingStrategy } from "../domain/pricingRule.js";
import { Vehicle, VehicleType } from "../domain/vehicle.js";
import type { FloorRepository } from "../repository/floorRepository.js";
import type { PricingRuleRepository } from "../repository/pricingRuleRepository.js";
import { SlotRepository } from "../repository/slotRepository.js";
import type { TicketRepository } from "../repository/ticketRepository.js";

export class AdminService {
    private floorRepository: FloorRepository;
    private parkingSlotRepository: SlotRepository
    private ticketRepository: TicketRepository;
    private pricingRuleRepository: PricingRuleRepository;
    constructor(floorRepository: FloorRepository, parkingSlotRepository: SlotRepository, ticketRepository: TicketRepository, pricingRuleRepository: PricingRuleRepository){
        this.floorRepository = floorRepository;
        this.parkingSlotRepository = parkingSlotRepository;
        this.ticketRepository = ticketRepository;
        this.pricingRuleRepository = pricingRuleRepository;
    }

    initializeParkingLot(){
        console.log('[SERVICE] Initializing parking lot')

        // create 3 floors
        for(let i = 1; i <= 3; i++){
            this.addFloor(i)
        }

        this.addSlotsToFloor(1, VehicleType.BIKE, 5)
        this.addSlotsToFloor(1, VehicleType.CAR, 5)
        this.addSlotsToFloor(1, VehicleType.EV, 5)

        this.addSlotsToFloor(2, VehicleType.BIKE, 5)
        this.addSlotsToFloor(2, VehicleType.CAR, 5)
        this.addSlotsToFloor(2, VehicleType.EV, 5)

        this.addSlotsToFloor(3, VehicleType.BIKE, 5)
        this.addSlotsToFloor(3, VehicleType.CAR, 5)
        this.addSlotsToFloor(3, VehicleType.EV, 5)

        this.initializeDefaultPricingRules()
        console.log('[SERVICE] Parking lot initialized successfully')
    }

    private addFloor(floorNumber: number){
        console.log(`[SERVICE] Adding floor ${floorNumber}`)
        if(this.floorRepository.existsFloorByNumber(floorNumber)){
            console.log(`[SERVICE] Floor ${floorNumber} already exists`)
            return;
        }
        const floor = new Floor(floorNumber)
        this.floorRepository.save(floor)
        console.log(`[SERVICE] Floor ${floorNumber} added successfully`)
    }

    private addSlotsToFloor(floorNumber: number, vehicleType: VehicleType, numberOfSlots: number){
        try {
            console.log(`[SERVICE] Adding ${numberOfSlots} slots for vehicle type ${vehicleType} to floor ${floorNumber}`)
            const floor = this.floorRepository.getFloorByNumber(floorNumber)
            for(let i = 0; i < numberOfSlots; i++){
                const slot = new ParkingSlot(vehicleType, floorNumber)
                this.parkingSlotRepository.save(slot)
                floor.addSlots(slot)
            }
        } catch (error) {
            console.error(error)
        }
    }

    private initializeDefaultPricingRules(){
        console.log('[SERVICE] Initializing pricing rules')

        const bikeRule = new PricingRule(PricingStrategy.FLAT, VehicleType.BIKE, 10, 5)
        const carRule = new PricingRule(PricingStrategy.FLAT, VehicleType.CAR, 10, 5)
        const truckRule = new PricingRule(PricingStrategy.FLAT, VehicleType.TRUCK, 10, 5)
        const evRule = new PricingRule(PricingStrategy.FLAT, VehicleType.EV, 10, 5)

        this.pricingRuleRepository.save(bikeRule)
        this.pricingRuleRepository.save(carRule)
        this.pricingRuleRepository.save(truckRule)
        this.pricingRuleRepository.save(evRule)

        console.log('[SERVICE] Pricing rules initialized successfully')
    }

    public addFloorPublic(floorNumber: number){
        this.addFloor(floorNumber)
    }

    public addSlotsToFloorPublic(floorNumber: number, vehicleType: VehicleType, numberOfSlots: number){
        this.addSlotsToFloor(floorNumber, vehicleType, numberOfSlots)
    }

    public updatePricingRulePublic(vehicleType: VehicleType, flatRate: number, hourlyRate: number){
        try {
            this.updateFlatpricing(flatRate, vehicleType)
            this.updateHourlyPricing(vehicleType, hourlyRate)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    public updateFlatpricing(flatRate: number, vehicleType: VehicleType){
        try {
            const rule = this.pricingRuleRepository.findRuleByVehicleType(vehicleType)
            rule.setFlatRate = flatRate
            this.pricingRuleRepository.updateRule(rule)
        } catch (error) {
            console.error(error)
        }
    }

    public updateHourlyPricing(vehicleType: VehicleType, hourlyRate: number){
        try {
            const rule = this.pricingRuleRepository.findRuleByVehicleType(vehicleType)
            rule.setHourlyRate = hourlyRate
            this.pricingRuleRepository.updateRule(rule)
        } catch (error) {
            console.error(error)
        }
    }

    public addPricingRule(pricingRule: PricingRule){
        try {
            this.pricingRuleRepository.save(pricingRule)
        } catch (error) {
            console.error(error)
        }
    }

    public getParkingStatus(){
        console.log('[SERVICE] Getting parking status')

        const floors = this.floorRepository.findAll()

        for(const floor of floors){
            console.log(`Floor ${floor.getFloorNumber()}:`)
            const slots = floor.getSlots()
            for(const slot of slots){
                console.log(`Slot ${slot.getId()} - Vehicle Type: ${slot.getSlotType()}, Occupied: ${slot.isSlotOccupied()}`)
            }
        }
    }
}