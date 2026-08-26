import {v4 as uuidv4} from "uuid"

export enum PaymentStatus {
    SUCCESS = 1,
    FAILED = 2,
    PENDING = 3
}

export class Receipt {
    private id: string;
    private paymentStatus: PaymentStatus;
    private exitTime: Date;
    private ticketId: string;
    private totalFee: number;

    constructor(ticketId: string, paymentStatus: PaymentStatus, totalFee: number){
        this.id = uuidv4()
        this.ticketId = ticketId
        this.paymentStatus = paymentStatus
        this.exitTime = new Date()
        this.totalFee = totalFee
    }

    getId(){
        return this.id
    }

    set markAsPaid(paymentStatus: PaymentStatus){
        this.paymentStatus = paymentStatus
    }

    set markFailed(paymentStatus: PaymentStatus){
        this.paymentStatus = paymentStatus
    }

    getPaymentStatus(){
        return this.paymentStatus
    }

    getExitTime(){
        return this.exitTime
    }

    getTicketId(){
        return this.ticketId
    }

    getTotalFee(){
        return this.totalFee
    }

    toString(){
        return `id: ${this.id},    
            paymentStatus: ${this.paymentStatus},
            exitTime: ${this.exitTime},
            ticketId: ${this.ticketId},
            totalFee: ${this.totalFee}
        `
    }
}
