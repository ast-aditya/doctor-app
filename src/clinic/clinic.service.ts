import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClinicDTO } from './dtos/clinic.dto';
import { clinicSchema } from './schema/clinic.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClinicService {
    constructor(@InjectModel(clinicSchema.name) private clinicModel: Model<clinicSchema>) {}

    async create(clinicdto: ClinicDTO): Promise<ClinicDTO> {
        const createdClinic = new this.clinicModel(clinicdto);
        return createdClinic.save();
      }

      async getClinicsByClinicId(clinicID: string): Promise<clinicSchema[]> {
        console.log("the service is fine");
        try {
          const clinic = await this.clinicModel.find({ clinic_id: clinicID }).exec();
          if (!clinic || clinic.length === 0) {
            throw new NotFoundException(`No prescriptions found for doc_id: ${clinicID}`);
          }
          return clinic;
        } catch (error) {
          throw new InternalServerErrorException('Error fetching prescriptions:');
          
    
        }
      }
      async delete(clinicId: string): Promise<boolean> {
        const result = await this.clinicModel.deleteOne({ _id: clinicId });
        return result.deletedCount > 0;
      }

      
}
