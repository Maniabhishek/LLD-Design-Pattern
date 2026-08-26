import type { VehicleType } from "../domain/vehicle.js";
import type { AdminService } from "../service/adminService.js";

export class AdminController {
    constructor(private adminService: AdminService){
        this.adminService = adminService
    }

    public initializeParkingLot(){
        console.log('[CONTROLLER] initializing parking lot');
        this.adminService.initializeParkingLot()
        console.log('[CONTROLLER] parking lot initialized');
    }

    public addFloor(floorNumber: number){
        console.log('[CONTROLLER] adding floor');
        this.adminService.addFloorPublic(floorNumber)
        console.log('[CONTROLLER] Floor added successfully by admin');
    }

    public addSlotToFloor(floorNumber: number, vehicleType: VehicleType, numberOfSlots: number){
        console.log('[CONTROLLER] adding slot');
        this.adminService.addSlotsToFloorPublic(floorNumber, vehicleType, numberOfSlots)
        console.log('[CONTROLLER] Slot added successfully by admin');
    }

    public updatePricingRule(vehicleType: VehicleType, flatRate: number, hourlyRate: number){
        console.log('[CONTROLLER] updating pricing rule');
        this.adminService.updatePricingRulePublic(vehicleType, flatRate, hourlyRate);
        console.log('[CONTROLLER] updated pricing rule');
    }

    public updateFlatPricing(vehicleTypes: VehicleType, flatRate: number){
        console.log('[CONTROLLER] updating flat pricing');
        this.adminService.updateFlatpricing(flatRate, vehicleTypes)
        console.log('[CONTROLLER] updated flat pricing');
    }

    public updateHourlyPricing(vehicleType: VehicleType, hourlyRate: number){
        console.log('[CONTROLLER] updating hourly pricing');
        this.adminService.updateHourlyPricing(vehicleType, hourlyRate)
        console.log('[CONTROLLER] updated hourly pricing');
    }

    public getParkingStatus(){
        console.log('[CONTROLLER] getting parking status');
        this.adminService.getParkingStatus()
        console.log('[CONTROLLER] parking status fetched successfully');
    }
}