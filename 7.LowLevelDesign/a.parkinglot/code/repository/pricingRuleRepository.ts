import { PricingRule } from "../domain/pricingRule.js";
import type { VehicleType } from "../domain/vehicle.js";

export class PricingRuleRepository {
    pricingRule: Map<string, PricingRule> = new Map()
    vehicleTypeRule: Map<VehicleType, string> = new Map()

    save(pricingRule: PricingRule){
        const id = pricingRule.getId()
        this.pricingRule.set(id, pricingRule)
        this.vehicleTypeRule.set(pricingRule.getVehicleType(), pricingRule.id)
    }

    findRuleById(id: string){
        const rule = this.pricingRule.get(id)
        if(!rule){
            throw new Error("no rule found with this id")
        }
        return rule
    }

    findRuleByVehicleType(vehicleType: VehicleType){
        const ruleId = this.vehicleTypeRule.get(vehicleType)
        if(!ruleId){
            throw new Error(`no rule found for this vehicle type: ${vehicleType}`)
        }
        const rule = this.pricingRule.get(ruleId)
        if(!rule){
            throw new Error(`no rule found for vehicle type: ${vehicleType}`)
        }
        return rule
    }

    updateRule(rule: PricingRule){
        if(this.pricingRule.has(rule.getId())){
            this.pricingRule.set(rule.getId(), rule)
            this.vehicleTypeRule.set(rule.getVehicleType(), rule.getId())
        }
    }
}