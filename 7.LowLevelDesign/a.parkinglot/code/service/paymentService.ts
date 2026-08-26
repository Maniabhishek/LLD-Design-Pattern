import type { PaymentGatewayAdapter } from "../adapter/paymentGatewayAdapter.js";
import { RazorpayGateway } from "../adapter/RazorPayGateway.js";
import { StripeGateway } from "../adapter/StripeGateway.js";
import { Payment, PaymentGateway } from "../domain/payment.js";
import { PaymentStatus } from "../domain/receipt.js";
import type { PaymentRepository } from "../repository/paymentRepository.js";

export class PaymentService {
    private defaultPaymentGateway: PaymentGatewayAdapter;
    private paymentRepository: PaymentRepository;
    constructor(paymentRepository: PaymentRepository){
        this.defaultPaymentGateway = new RazorpayGateway();
        this.paymentRepository = paymentRepository
    }

    processPayment(ticketid: string, amount: number){
        const payment = new Payment(amount, PaymentStatus.PENDING, ticketid, PaymentGateway.RAZORPAY)
        this.paymentRepository.save(payment)

        const isSuccess = this.defaultPaymentGateway.pay(ticketid, amount)
        if(isSuccess){
            payment.markSuccess()
        }else {
            payment.markFailed()
        }

        this.paymentRepository.update(payment)
        console.log(`[SERVICE] payment processed with status: ${isSuccess ? "Success" : "Failed"}`)
        return isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED
    }

    processPaymentWithRetry(ticketId: string, amount: number, maxAttempt: number){
        console.log(`[SERVICE] processing payment with retry ticketid: ${ticketId}, amount: ${amount}`)
        for(let i = 0; i < maxAttempt; i++){
            console.log(`[SERVICE] Payment attemp: ${i+1}`)

            const isSuccess = this.processPayment(ticketId, amount)
            if(isSuccess){
                console.log(`[SERVICE] Payment successful on attemp ${i+1}`)
                return true
            }

            // try changing the gateway
            if(i > 1){
                this.defaultPaymentGateway = new StripeGateway()
                console.log(`[SERVICE] Switching to stripe gateway `)
            }
        }
        return false
    }

    setDefaultGateway(gateway: PaymentGatewayAdapter){
        this.defaultPaymentGateway = gateway;
    }
}