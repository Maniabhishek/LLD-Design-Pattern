export interface PaymentGatewayAdapter {
    pay(ticketId: string, amount: number): boolean;
}