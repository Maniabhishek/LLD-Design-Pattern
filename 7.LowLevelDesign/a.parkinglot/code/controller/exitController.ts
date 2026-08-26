import { PaymentStatus } from "../domain/receipt.js";
import type { PaymentService } from "../service/paymentService.js";
import type { PricingService } from "../service/pricingService.js";
import type { ReceiptService } from "../service/receiptService.js";
import type { SlotService } from "../service/slotService.js";
import type { TicketService } from "../service/ticketService.js";

export class ExitController {
    constructor(private ticketService: TicketService, private pricingService: PricingService, private receiptService: ReceiptService, private paymentService: PaymentService, private slotService: SlotService){}

    exitVehicle(ticketId: string){
        try {
            const ticket = this.ticketService.getTicket(ticketId)
            if(!ticket.isTicketActive){
                throw new Error("ticket is already deactivated")
            }

            const fee = this.pricingService.calculateFee(ticket)
            const paymentStatus = this.paymentService.processPayment(ticket.getId(),fee)
            if(paymentStatus === PaymentStatus.FAILED){
                throw new Error('payment failed, please try again later')
            }
            const receipt = this.receiptService.generateReceipt(ticket, fee, paymentStatus)
            receipt.markAsPaid = PaymentStatus.SUCCESS

            this.slotService.releaseSlot(ticket.getParkingSlot().getId())

            this.ticketService.deactivateTicket(ticketId)
            console.log(`[CONTROLLER] Vehicle exit successful - Receipt generated: ${receipt.getId()}`)
            return ticket

        } catch(error) {
            console.error(error)
        }
    }
}