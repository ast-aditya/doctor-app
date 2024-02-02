import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/billing.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @ApiOperation({ summary: 'Create Bill' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                amountPaid: {
                    type: 'number',
                    example: 1000,
                    description: 'The amount paid by the patient'
                },
                totalAmount: {
                    type: 'number',
                    example: 1200,
                    description: 'The total amount of the bill'
                },
                discount: {
                    type: 'number',
                    example: 200,
                    description: 'The discount applied to the bill'
                },
                discountCoupon: {
                    type: 'string',
                    example: 'DISCOUNT200',
                    description: 'The discount coupon used'
                },
                methodOfPayment: {
                    type: 'string',
                    example: 'Credit Card',
                    description: 'The method of payment used by the patient'
                },
                transactionStatus: {
                    type: 'string',
                    example: 'Completed',
                    description: 'The status of the transaction'
                },
                patientID: {
                    type: 'string',
                    example: 'patient123',
                    description: 'The ID of the patient'
                },
                doctorID: {
                    type: 'string',
                    example: 'doctor123',
                    description: 'The ID of the doctor'
                },
                appointmentID: {
                    type: 'string',
                    example: 'appointment123',
                    description: 'The ID of the appointment'
                },
            },
        },
    })
    
    @Post()
    async create(@Body() createBillingDto: CreateBillingDto) {
        return this.billingService.create(createBillingDto);
    }
    @ApiOperation({ summary: 'Get all bills with status pending' })
    @Get('pending')
    async getPendingBills() {
        return this.billingService.getPendingBills();
    }

    @ApiOperation({ summary: 'verify bill with ID' })
    @Get('verify/:billId')
    async verifyTransaction(@Param('billId') billId: string) {
        return this.billingService.verifyTransaction(billId);
    }
    @ApiOperation({ summary: 'change transaction status with ID' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    example: 'Pending',
                    description: 'The status of the transaction'
                },
            },
        },
    })
    
    @Post(':billId/status')
    async changeTransactionStatus(@Param('billId') billId: string, @Body('status') status: string) {
    return this.billingService.changeTransactionStatus(billId, status);
    }
    @ApiOperation({ summary: 'Get all bills' })
    @Get()
    async getAllBills() {
        return this.billingService.getAllBills();
    }
    @ApiOperation({ summary: 'Get bill with ID' })
    @Get(':billId')
    async getBillById(@Param('billId') billId: string) {
        return this.billingService.getBillById(billId);
    }

    @ApiOperation({ summary: 'Get all appointments' })
    @Get('unverified')
    async getUnverifiedBills() {
        return this.billingService.getUnverifiedBills();
    }
}
