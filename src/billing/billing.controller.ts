import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/billing.dto';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }
    @Post()
    async create(@Body() createBillingDto: CreateBillingDto) {
        return this.billingService.create(createBillingDto);
    }
    @Get('pending')
    async getPendingBills() {
        return this.billingService.getPendingBills();
    }

    @Get('verify/:billId')
    async verifyTransaction(@Param('billId') billId: string) {
        return this.billingService.verifyTransaction(billId);
    }
    @Post(':billId/status')
    async changeTransactionStatus(@Param('billId') billId: string, @Body('status') status: string) {
    return this.billingService.changeTransactionStatus(billId, status);
    }
    @Get()
    async getAllBills() {
        return this.billingService.getAllBills();
    }

    @Get(':billId')
    async getBillById(@Param('billId') billId: string) {
        return this.billingService.getBillById(billId);
    }


    @Get('unverified')
    async getUnverifiedBills() {
        return this.billingService.getUnverifiedBills();
    }
}
