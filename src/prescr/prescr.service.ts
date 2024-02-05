import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { prescrSchema } from './schemas/prescr.schema';
import { PrescriptionDTO } from './dtos/prescr.dto';
@Injectable()
export class prescrService {
  constructor(@InjectModel(prescrSchema.name) private prescriptionModel: Model<prescrSchema>) {}

  async create(prescriptionDTO: PrescriptionDTO): Promise<PrescriptionDTO> {
    const createdPrescription = new this.prescriptionModel(prescriptionDTO);
    return createdPrescription.save();
  }
}
