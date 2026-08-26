import type { Payment } from "../domain/payment.js";

export class PaymentRepository {
    payments: Map<string, Payment> = new Map();
    ticketToPayment: Map<string, string[]> = new Map();
    save(payment: Payment){
        this.payments.set(payment.getId(), payment)
        const paymentIdsForTicket = this.ticketToPayment.get(payment.getTicketId())
        if(paymentIdsForTicket){
            this.ticketToPayment.set(payment.getTicketId(), [...paymentIdsForTicket, payment.getId()])
        }else {
            this.ticketToPayment.set(payment.getTicketId(), [payment.getId()])
        }
    }

    getPaymentById(id: string){
        return this.payments.get(id)
    }

    getAllPaymentForTicketId(id: string){
        const paymentIds = this.ticketToPayment.get(id)
        if(!paymentIds){
            throw new Error(`no payments found for this ticket id: ${id}`)
        }
        const listOfPayments: Payment[] = []
        for(const paymentId of paymentIds){
            const payment = this.payments.get(paymentId)
            if(payment){
                listOfPayments.push(payment)
            }
        }
        return listOfPayments
    }

    getAllPayments(): Payment[]{
        return [...this.payments.values()]
    }

    update(payment: Payment){
        const paymentId = this.payments.get(payment.getId())
        if(paymentId){
            this.payments.set(payment.getId(), payment)
        }
    }

    delete(id: string){
        const payment = this.payments.get(id)
        if(!payment){
            throw new Error(`payment with this id ${id} doesn't exists`)
        }
        this.payments.delete(id)
        const paymentIds = this.ticketToPayment.get(payment.getTicketId())
        let newPaymentIds: string[] = []
        if(paymentIds){
            newPaymentIds = paymentIds.filter(pid=> pid !== id)
        }
        this.ticketToPayment.set(payment.getTicketId(), newPaymentIds)
    }
}