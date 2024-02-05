import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  try{
  const bill = await this.billingModel.findById(billId);
  bill.isVerified = true;
  if(!bill){
    throw new NotFoundException(`No Bills found for Bill_id: ${billId}`);
  } return bill.save();

  }catch(error){
    throw new InternalServerErrorException("error fetching bills");
  }
  }

  async delete(docId: string): Promise<boolean> {
    const result = await this.billingModel.deleteOne({ _id: docId });
    return result.deletedCount > 0;
  }

  async changeTransactionStatus(billId: string, status: string) {
    try{
    const bill = await this.billingModel.findById(billId);
    bill.transactionStatus = status;
    if(!bill){
      throw new NotFoundException(`Not found Bill with ID: ${billId}`);
    }
    return bill.save();
    }
    catch(error){
      throw new InternalServerErrorException("Internal Server Error");
    }
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
