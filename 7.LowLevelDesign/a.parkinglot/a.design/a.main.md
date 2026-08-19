### Functional Requirements

#### Entry flow:
- vehicle arrives at gate
- generate a ticket and assign slot based on vehicle type
- Mark slot as occupied
- Return EntryResult with success/failure status

#### Exit flow:
- user presents tickets at exits
- calculate fee based on pricing rules (minimum of flat and hourly pricing)
- process payment through the payment gateway
- Release slot and generate receipt
- Return ExitResult with success/failure status

#### Admin configurations:
- Add/Edit/Delete floors and slots
- Define pricing rules based on vehicle type (both flat and hourly rates)
- Update flat and hourly pricing for vehicle types
- view current parking status

> You can think of cases like server failures, where we may need a human to override instead of automated gates working by themselves

#### Non-function Requirements
- scalability: Must support multiple parking slots and thousands of slots
- Consistency: strong consistency for slot allocation and release
- Availability: High availability for entry/exit even during payment gateway failure
- latency: low latency (<500 ms ) for ticket generation and exit processing
- extensibility: easily add new vehicle types, pricing strategies, or gateways
- security: role based access for admin actions

#### Edge Cases
- Payment failure during exit - retry and hold slot
- ticket lost: allow admin override
- clock skew: system time validation
- slot state mismatch: periodic reconcilation


#### step 2: lets follow the steps we are starting with *identify core entities*
- core entities
<img width="400" height="564" alt="image" src="https://github.com/user-attachments/assets/dfc41abd-246f-4279-8320-b24af283cdb7" />

- some other entities

<img width="360" height="564" alt="image" src="https://github.com/user-attachments/assets/7508d425-5b3d-4641-b0c2-bce93ff4545b" />

#### Step 3: Discuss interaction flow
- lets see the flows
  - Entry flow:
    - Driver enters, get a slot , generate ticket
  - Exit flow:
    - Driver exits, shows the ticket, price computed, (minimum of flat or hourly rate pricing), pays the amount (with retries if it fails), get the receipt, released, ticket deactivate to avoid multiple entry
  - Admin flow:
    - Admin requests to add floor, add slots, or update pricing 

> at this point start thinking about the classes, what all classes you are going to need

#### Step 4: design class structure and relationships
- Architectural Layers:
  - client/UI: Controller Layer (HTTP/API) -> Service Layer -> Repository Layer -> Domain Layer

##### Controllers:
  1. Entry Controller
    - enterVehicle(licenseNumber string, vehicleType: VehicleType): EntryResult
  2. Exist Controller
    - exitVehicle(uuid ticketId): ExitResult
  3. AdminController
    - addFloor(floorNumber: number)
    - addSlot(floorNumber: number, slotType VehicleType)
    - updatePricing(vehicleType: VehicleType, hourlyRate: number, flatRate: number)
    - updateFlatPricing(vehicleType: VehicleType, flatRate: number)
    - updateHourlyPricing(vehicleType: VehicleType, ratePerHour: number)

##### Designing SERVICES
1. TicketService
   - generateTicket(vehicle: Vehicle, parkingSlot: ParkingSlot)
   - getTicket(ticketId: string) Ticket
2. SlotService:
   - allocateSlot(slot: ParkingSlot)
   - releaseSlot(slotid: string)
3. PricingService
   - computePrice(ticket: Ticket): number
5. PaymentService
   - processPayment(ticketid: string, amount: number)
6. ReceiptService
   - generateReceipt(ticket: Ticket, fee: number, paymentStatus: boolean)
8. AdminService
   - addFloor(floorNumber: int)
   - addSlot(floorNumber: number, vehicleType: VehicleType)
   - updatePricing(vehicleType: VehicleType, hourlyRate: number, flatRate: number)
   - updateFlatPricing(vehicleType: VehicleType, flatRate: number)
   - updateHourlyPricing(vehicleType: VehicleType, hourlyRate: number)

##### Repositories
1. TicketRepository
    - save(ticket: Ticket) void
    - findById(id: string): Ticket
    - findActiveTickets(): List<Ticket>
    - deactivateTicket(id: string): void
2. SlotRepository
    - updateSlot(parkingSlot: ParkingSlot)
    - findById(id: string): ParkingSlow
    - findAvailableSlot(vehicleType: VehicleType)
3. Floor Repository
    - save(floor: Floor)
    - findByFloor(floorNumber: number): Floor
4. PricingRuleRepository
    - save(PricingRule rule)
    - findByVehicleType(vehicleType: VehicleType)
5. PaymentRepository
    - save(payment: Payment): void
    - findByTicketId(ticketid: string): Payment

##### so one more thing are we going to use any design pattern here , do you see yes there can be multiple payment methods, we can use paymentGateway Adapter
- Interface:
    - PaymentAdapter pay(ticketid: string, amount: number): boolean
- Implementations:
    - RazorpayAdapter implements PaymentGatewayAdapter
    - StripeAdapter implements PaymentGatewayAdapter 

#### Step 5: core use cases and methods
- ENTRY USE CASE:
    - enterVehicle() -> SlotService.allocateSlot() -> TicketService.generateTicket() -> TicketRepository.save() -> return EntryResult
- EXIT USE CASE:
    - exitVehicle() -> TicketService.getTicket() -> PricingService.calculateFee() -> PaymentService.processPayment() -> PaymentGatewayAdapter.pay() -> SlotService.releaseSlot() -> ReceiptService.generateReceipt() -> return ExitResult()
- ADMIN USE CASES:
    - addFloor() -> AdminService -> FloorRepository.save()
    - addSlot() -> slotService.save()
    - updatePricing() -> PricingRuleRepository.save()








