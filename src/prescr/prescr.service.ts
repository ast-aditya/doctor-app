import { Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
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

   

  async getPrescriptionsByDocId(docId: string): Promise<prescrSchema[]> {
    console.log("the service is fine");
    try {
      const prescriptions = await this.prescriptionModel.find({ doc_id: docId }).exec();
      if (!prescriptions || prescriptions.length === 0) {
        throw new NotFoundException(`No prescriptions found for doc_id: ${docId}`);
      }
      return prescriptions;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching prescriptions:');
      

    }
  }

  async update(docId: string, prescription: PrescriptionDTO): Promise<PrescriptionDTO> {
    const existingPrescription = await this.prescriptionModel.findById(docId);
    if (!existingPrescription) {
        throw new NotFoundException(`Prescription with ID "${docId}" not found`);
    }
    existingPrescription.clinic_id = prescription.clinic_id;
    existingPrescription.pat_id = prescription.pat_id;
    existingPrescription.appoi_day = prescription.appoi_day;
    existingPrescription.appoi_time = prescription.appoi_time;
    existingPrescription.Meds = prescription.Meds;

    return existingPrescription.save();
}
async delete(docId: string): Promise<boolean> {
  const result = await this.prescriptionModel.deleteOne({ _id: docId });
  return result.deletedCount > 0;
}

async findAllPrescriptions(): Promise<prescrSchema[]> {
  try {
    return await this.prescriptionModel.find().exec();
  } catch (error) {
    throw new Error('Error fetching prescriptions');
  }
}

}

