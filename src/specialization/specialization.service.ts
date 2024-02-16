import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialization } from './schema/specialization.schema';
import { SpecialDTO } from './dtos/specialization.dto';

@Injectable()
export class SpecializationService {
  constructor(@InjectModel(Specialization.name) private readonly specializationModel: Model<Specialization>) {}

  async create(createSpecializationDto: SpecialDTO): Promise<Specialization> {
    try {
      const createdSpecialization = new this.specializationModel(createSpecializationDto);
      const savedSpecialization = await createdSpecialization.save();
      console.log('Specialization created successfully');
      return savedSpecialization;
    } catch (error) {
      console.error('Error creating specialization:', error);
      throw new InternalServerErrorException(`Error creating specialization: ${error.message}`);
    }
  }

  async findAll(): Promise<Specialization[]> {
    try {
      const specializations = await this.specializationModel.find().exec();
      console.log('All specializations retrieved successfully');
      return specializations;
    } catch (error) {
      console.error('Error fetching specializations:', error);
      throw new InternalServerErrorException(`Error fetching specializations: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Specialization> {
    try {
      const specialization = await this.specializationModel.findById(id).exec();
      if (!specialization) {
        throw new NotFoundException('Specialization not found');
      }
      console.log('Specialization successfully found by ID');
      return specialization;
    } catch (error) {
      console.error('Error fetching specialization:', error);
      throw new InternalServerErrorException(`Error fetching specialization: ${error.message}`);
    }
  }
  async findByDoctorId(doctorIds: string[]): Promise<Specialization[]> {
    try {
      const specializations = await this.specializationModel.find({ doc_id: { $in: doctorIds } }).exec();
      console.log('Specializations found by doctor IDs:');
      return specializations;
    } catch (error) {
      console.error('Error fetching specializations by doctorId:', error);
      throw new InternalServerErrorException(`Error fetching specializations by doctorId: ${error.message}`);
    }
  }
  async update(id: string, updateSpecializationDto: SpecialDTO): Promise<Specialization> {
    try {
      const updatedSpecialization = await this.specializationModel.findByIdAndUpdate(id, updateSpecializationDto, { new: true }).exec();
      if (!updatedSpecialization) {
        throw new NotFoundException('Specialization not found');
      }
      console.log('Specialization updated successfully:');
      return updatedSpecialization;
    } catch (error) {
      console.error('Error updating specialization:', error);
      throw new InternalServerErrorException(`Error updating specialization: ${error.message}`);
    }
  }


  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.specializationModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Specialization not found');
      }
      console.log('Specialization removed successfully');
      return true;
    } catch (error) {
      console.error('Error removing specialization:', error);
      throw new InternalServerErrorException(`Error removing specialization: ${error.message}`);
    }
  }
}
