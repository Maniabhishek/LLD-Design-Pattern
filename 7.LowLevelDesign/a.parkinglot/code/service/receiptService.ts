import { PaymentStatus, Receipt } from "../domain/receipt.js";
import type { Ticket } from "../domain/ticket.js";

export class ReceiptService {
    generateReceipt(ticket: Ticket, fee: number, paymentStatus: PaymentStatus){
        console.log(`[SERVICE] Generating receipt for ticket: ${ticket.getId()}`)
        const receipt = new Receipt(ticket.getId(), paymentStatus, fee)
        return receipt
    }

    markAsPaid(receipt: Receipt, paymentStatus: PaymentStatus){
        receipt.markAsPaid = paymentStatus
    }
}