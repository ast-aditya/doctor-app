import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Billing } from './schema/billing.schema';
import { CreateBillingDto } from './dto/billing.dto';
import { Model } from 'mongoose';

@Injectable()
export class BillingService {
    constructor(@InjectModel(Billing.name) private billingModel: Model<Billing>) {}

    async create(createBillingDto: CreateBillingDto) {
        const createdBilling = new this.billingModel(createBillingDto);
        const savedBilling = await createdBilling.save();
      
        const billId = savedBilling._id;
      
        return this.verifyTransaction(billId);
      }
      

  async verifyTransaction(billId: string) {
  const bill = await this.billingModel.findById(billId);
  bill.isVerified = true;
  return bill.save();
}
  async changeTransactionStatus(billId: string, status: string) {
    const bill = await this.billingModel.findById(billId);
    bill.transactionStatus = status;

    return bill.save();
  }
  async getAllBills(){
    return this.billingModel.find();
    }

    async getBillById(billId: string){
        return this.billingModel.findById(billId);
    }

    async getPendingBills(){
        return this.billingModel.find({ transactionStatus: 'Pending' });
    }

    async getUnverifiedBills() {
        return this.billingModel.find({ isVerified: false });
    }
}
