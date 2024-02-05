import { Body, Controller, Get, Param, Post,Delete, NotFoundException } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/billing.dto';
import { ApiBody, ApiOperation, ApiTags,ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
@ApiTags('billing')
@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @ApiOperation({ summary: 'Create Bill' })
    @ApiResponse({ status: 201, description: 'The patient has been successfully created.'})
   @ApiResponse({ status: 400, description: 'Bad Request.Username or password should not be empty.'})
    @ApiCreatedResponse({
        description:"billing creation!",
        type:CreateBillingDto
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

  @ApiOperation({summary:"delete bills"})
  @Public()
  @Delete('delete/:doc_id')
  async delete(@Param('doc_id') docId: string): Promise<void> {
      const deleted = await this.billingService.delete(docId);
      if (!deleted) {
          throw new NotFoundException(`Prescription with ID "${docId}" not found`);
      }
  }
}
