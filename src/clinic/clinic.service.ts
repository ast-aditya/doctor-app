import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClinicDTO } from './dtos/clinic.dto';
import { clinicSchema } from './schema/clinic.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClinicService {
    constructor(@InjectModel(clinicSchema.name) private clinicModel: Model<clinicSchema>) {}


    async create(clinicDto: ClinicDTO): Promise<any> {
      const { Clinic_name, Address, DoctorIDs, open_days, opening_time, closing_time } = clinicDto;
      try {
        const existingClinic = await this.clinicModel.findOne({ Clinic_name });
        if (existingClinic) {
          throw new ConflictException('Clinic with the same name already exists');
        }
        const newClinic = new this.clinicModel({
          Clinic_name,
          Address,
          DoctorIDs,
          open_days,
          opening_time,
          closing_time
        });
        const clinic = await newClinic.save();
  
        console.log(`Clinic created successfully with Id : ${clinic.id}`);
  
        return clinic;
      } catch (error) {
        if (
          error instanceof ConflictException ||
          error instanceof BadRequestException ||
          error instanceof NotFoundException
        ) {
          throw error;
        }
        throw new InternalServerErrorException(
          `Error while creating clinic ${error.message}`,
        );
      }
    }

    async getClinicById(clinicId: string){
      try {
        const clinic = await this.clinicModel.findById(clinicId);
        if (!clinic) {
          throw new NotFoundException(`Clinic with ID "${clinicId}" not found`);
        }
        return clinic;
      } catch (error) {
        throw new InternalServerErrorException(`Error while getting clinic ${error.message}`);
      }
    }
    
    async delete(clinic_id: string){
      try {
        const deleted = await this.clinicModel.deleteOne({ clinic_id });
        if (!deleted) {
          throw new NotFoundException(`Clinic with ID "${clinic_id}" not found`);
        }
      } catch (error) {
        throw new InternalServerErrorException(`Error while deleting clinic ${error.message}`);
      }
    }
    
    async getAllClinics() {
      try {
        return await this.clinicModel.find();
      } catch (error) {
        throw new InternalServerErrorException(`Error while getting all clinics ${error.message}`);
      }
    }
    
    async addDoctor(clinicId: string, doctorId: string) {
      try {
        const clinic = await this.getClinicById( clinicId );
        if (!clinic) {
          throw new NotFoundException(`Clinic with ID "${clinicId}" not found`);
        }
        clinic.DoctorIDs.push(doctorId);
        return await clinic.save();
      } catch (error) {
        throw new InternalServerErrorException(`Error while adding doctor to clinic ${error.message}`);
      }
    }
    async update(clinicId: string, clinicDto: ClinicDTO){
      try {
        const { Clinic_name, Address, DoctorIDs, open_days, opening_time, closing_time } = clinicDto;
        const existingClinic = await this.getClinicById(clinicId);
        console.log(existingClinic)
        if (!existingClinic) {
          throw new NotFoundException(`Clinic with ID "${clinicId}" not found`);
        }
        const updatedClinic = {
          Clinic_name,
          Address,
          DoctorIDs,
          open_days,
          opening_time,
          closing_time
        };
        const clinic =  await this.clinicModel.updateOne({ _id: clinicId }, { $set: updatedClinic }, { upsert: true });
        return {clinic, updatedClinic};
      } catch (error) {
        if (
          error instanceof ConflictException ||
          error instanceof BadRequestException ||
          error instanceof NotFoundException
        ) {
          throw error;
        }
        throw new InternalServerErrorException(
          `Error while updating clinic ${error.message}`,
        );
      }
    }
    async getClinicsByDoctor(doctorId: string) {
      try {
        const clinics = await this.clinicModel.find({ DoctorIDs: doctorId });
        return Promise.all(clinics.map(async clinic => {
          return this.getClinicById(clinic._id);
        }));
      } catch (error) {
        throw new InternalServerErrorException(`Error while getting clinics by doctor ${error.message}`);
      }
    }
    
    
    

      
}
