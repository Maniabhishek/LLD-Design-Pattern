import type { PaymentGatewayAdapter } from "./paymentGatewayAdapter.js";

export class RazorpayGateway implements PaymentGatewayAdapter {
    pay(ticketId: string, amount: number): boolean {
        console.log(`[ADAPTER] Razorpay adapter processing payment for ticket: ${ticketId} amount: ${amount}`)
        const randomV = Math.round(Math.random()*10)
        const success = randomV < 9
        console.log(`[ADAPTER] RazorpayAdapter payment result: ${success ? 'Success' : 'Failed'}`)
        return success
    }
}