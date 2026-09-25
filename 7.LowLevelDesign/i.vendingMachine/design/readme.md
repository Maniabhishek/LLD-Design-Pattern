### Step 1: Clarify Requirements
#### Functional Requirements:
- The system should support multiple products with different prices and quantities.
- The system should accept notes of different denominations ($1, $5, $10, $20, $50, $100).
- The system should dispense selected products and return change if necessary.
- The system should track available products and quantities (inventory management).
- The system should handle multiple transactions concurrently and ensure data consistency.
- The system should provide admin interface for restocking products and collecting money.
- The system should handle exceptional scenarios (insufficient funds, out-of-stock products).
- The system should ensure operations are only allowed in appropriate states.
- The system should manage the following operational states:
    - IDLE: Ready to accept new transactions, users can browse and select products.
    - PROCESSING_PAYMENT: User has selected product and is paying, can insert money or cancel.
    - DISPENSING: Payment complete, machine is dispensing product and change.
    - OUT_OF_SERVICE: Machine is not operational due to maintenance or malfunction.

### Edge Cases to Consider
- Concurrent access to same product.
- Insufficient change in machine.
- Power failure.
- Product out of stock during transaction.
- Payment failure scenarios.


### Step 2: Identify Core Entities
1. VendingMachine (Core Entity)
- id: int [PK]
- location: String
- currentState: VendingMachineState
- isOperational: boolean
- 2. Product
- id: int [PK]
- name: String
- price: Double
- category: ProductCategory (Enum: BEVERAGE, SNACK, CANDY, etc.)
3. Inventory
- productId: int [FK]
- vendingMachineId: int [FK]
- quantity: int
- minThreshold: int (for restocking alerts)
4. CashBox
- id: int [PK]
- vendingMachineId: int [FK]
- denominations: Map<Denomination, Integer> (denomination → count)
- totalAmount: Double
5. Denomination (Enum)
- ONE_DOLLAR(100)
- FIVE_DOLLAR(500)
- TEN_DOLLAR(1000)
- TWENTY_DOLLAR(2000)
- FIFTY_DOLLAR(5000)
- HUNDRED_DOLLAR(10000)
6. Transaction
- id: int [PK]
- vendingMachineId: int [FK]
- productId: int [FK]
- amountInserted: Double
- amountRequired: Double
- changeReturned: Double
- status: TransactionStatus (Enum: PENDING, COMPLETED, FAILED, CANCELLED)
- timestamp: long
7. TransactionStatus (Enum)
- PENDING
- COMPLETED
- FAILED
- CANCELLED
8. ProductCategory (Enum)
- BEVERAGE
- SNACK
- CANDY
- CHIPS
- COOKIES
- OTHER
9. Recovery (Power Failure Recovery)
- id: int [PK]
- vendingMachineId: int [FK]
- transactionId: int [FK]
- state: VendingMachineState (PROCESSING_PAYMENT or DISPENSING)
- status: RecoveryStatus (Enum: PENDING, COMPLETED)
- createdAt: long
- completedAt: long (nullable)
10. RecoveryStatus (Enum)
- PENDING
- COMPLETED

