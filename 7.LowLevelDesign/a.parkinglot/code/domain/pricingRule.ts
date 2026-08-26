import {v4 as uuidv4} from "uuid"
import type { VehicleType } from "./vehicle.js";

export enum PricingStrategy {
    FLAT = 1,
    HOURLY = 2
}

export class PricingRule {
    id: string;
    pricingRule: PricingStrategy;
    vehicleType: VehicleType;
    flatRate: number;
    hourlyRate: number;

    constructor(pricingRule: PricingStrategy, vehicleType: VehicleType, flatRate: number, hourlyRate: number){
        this.id = uuidv4()
        this.pricingRule = pricingRule
        this.vehicleType = vehicleType
        this.hourlyRate = hourlyRate
        this.flatRate = flatRate
    }

    set setHourlyRate(hourlyRate: number){
        this.hourlyRate = hourlyRate
    }

    set setFlatRate(ratePerHour: number){
        this.flatRate = ratePerHour
    }

    getVehicleType(){
        return this.vehicleType
    }

    getPricingRule(){
        return this.pricingRule
    }

    getFlatRate(){
        return this.flatRate
    }

    getRatePerhour(){
        return this.hourlyRate
    }

    getId(){
        return this.id
    }
}