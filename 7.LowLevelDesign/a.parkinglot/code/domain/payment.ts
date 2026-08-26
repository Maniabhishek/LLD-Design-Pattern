import {v4 as uuidv4} from "uuid"
import { PaymentStatus } from "./receipt.js";

export enum PaymentGateway{
    RAZORPAY = 1,
    STRIPE = 2
}

export class Payment {
    id: string
    amount: number;
    status: PaymentStatus;
    ticketid: string;
    gateway: PaymentGateway;

    constructor(amount: number, status: PaymentStatus, ticketid: string, gateway: PaymentGateway){
        this.id = uuidv4()
        this.amount = amount
        this.status = status
        this.ticketid = ticketid
        this.gateway = gateway
    }

    getId(){
        return this.id
    }

    getAmount(){
        return this.amount
    }

    getStatus(){
        return this.status
    }

    getTicketId(){
        return this.ticketid
    }

    getGateway(){
        return this.gateway
    }

    markSuccess(){
        this.status = PaymentStatus.SUCCESS
    }

    markFailed(){
        this.status = PaymentStatus.FAILED
    }

    toString(){
        return `Payment{ id: ${this.id} amount: {this.amount} }`
    }
}