import type { PricingRule } from "../domain/pricingRule.js";
import type { Ticket } from "../domain/ticket.js";
import { VehicleType } from "../domain/vehicle.js";
import type { PricingRuleRepository } from "../repository/pricingRuleRepository.js";

export class PricingService {
    pricingRepository: PricingRuleRepository

    constructor(pricingRepository: PricingRuleRepository){
        this.pricingRepository = pricingRepository
    }

    calculateFee(ticket: Ticket){
        // for demo purpose fixing the vehicle type
        const vehicleType = VehicleType.CAR

        const pricingRule = this.pricingRepository.findRuleByVehicleType(vehicleType)
        const flatFee = pricingRule.getFlatRate()
        const hourlyFee = this.calculateHourlyFee(ticket, pricingRule.getRatePerhour())

        const finalFee = Math.min(flatFee, hourlyFee)
        return finalFee
    }

    calculateHourlyFee(ticket: Ticket, ratePerHour: number){
        // taking seconds only for demo 
        const diff = new Date().getSeconds() - ticket.getEntryTime().getSeconds()

        // considering rate per hr to rate per sec
        const totalFee = diff * ratePerHour
        return totalFee
    }

    addPricingRule(pricingRule: PricingRule){
        this.pricingRepository.save(pricingRule)
    }

    updatePricingRule(pricingRule: PricingRule){
        this.pricingRepository.updateRule(pricingRule)
    }
}