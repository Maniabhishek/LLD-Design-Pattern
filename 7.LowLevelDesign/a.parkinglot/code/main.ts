import { AdminController } from "./controller/adminController.js";
import { EntryController } from "./controller/entryController.js";
import { VehicleType } from "./domain/vehicle.js";
import { FloorRepository } from "./repository/floorRepository.js";
import { PricingRuleRepository } from "./repository/pricingRuleRepository.js";
import { SlotRepository } from "./repository/slotRepository.js";
import { TicketRepository } from "./repository/ticketRepository.js";
import { AdminService } from "./service/adminService.js";
import { SlotService } from "./service/slotService.js";
import { TicketService } from "./service/ticketService.js";

class Main {
    adminController: AdminController;
    floorRepository: FloorRepository;
    slotRepository: SlotRepository;
    ticketRepository: TicketRepository;
    pricingRuleRepository: PricingRuleRepository;
    entryController: EntryController;
    ticketService: TicketService;
    slotService: SlotService;

    constructor() {
        this.floorRepository = new FloorRepository()
        this.slotRepository = new SlotRepository()
        this.ticketRepository = new TicketRepository()
        this.pricingRuleRepository = new PricingRuleRepository()
        this.ticketService = new TicketService(this.ticketRepository)
        this.slotService = new SlotService(this.slotRepository)
        this.entryController = new EntryController(this.ticketService, this.slotService)
        this.adminController = new AdminController(new AdminService(this.floorRepository, this.slotRepository, this.ticketRepository, this.pricingRuleRepository));
    }

    start() {
        this.adminController.initializeParkingLot()
        
        this.entryController.enterVehicle(VehicleType.CAR, "KA-01-1234")

        console.log('------ parking status -------');
        this.adminController.getParkingStatus()

        this.entryController.enterVehicle(VehicleType.CAR, "KA-02-1234")

        console.log('------ parking status -------');
        this.adminController.getParkingStatus()
    }
}
console.log('===');
new Main().start()