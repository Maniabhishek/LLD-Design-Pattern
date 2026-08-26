import  { v4 as uuidv4 } from "uuid"

export enum VehicleType {
    CAR = 1,
    BIKE = 2,
    TRUCK = 3,
    EV = 4
}

export class Vehicle {
    private id: string;
    private numberPlate: string;
    private vehicleType: VehicleType;

    constructor(numberPlate: string, vehicleType: VehicleType){
        this.id = uuidv4();
        this.numberPlate = numberPlate;
        this.vehicleType = vehicleType;
    }

    getId(){
        return this.id
    }

    getNumberPlate(){
        return this.numberPlate
    }

    getVehicleType(){
        return this.vehicleType
    }
}
