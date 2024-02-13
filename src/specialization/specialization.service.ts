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
      return await createdSpecialization.save();
    } catch (error) {
      throw new InternalServerErrorException(`Error creating specialization: ${error.message}`);
    }
  }

  async findAll(): Promise<Specialization[]> {
    try {
      return await this.specializationModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching specializations: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Specialization> {
    try {
      return await this.specializationModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching specialization: ${error.message}`);
    }
  }
  async findByDoctorId(doctorIds: string[]): Promise<Specialization[]> {
    try {
      // Query specializations where doc_id contains any of the provided doctorIds
      return await this.specializationModel.find({ doc_id: { $in: doctorIds } }).exec();
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching specializations by doctorId: ${error.message}`);
    }
  }
  async update(id: string, updateSpecializationDto: SpecialDTO): Promise<Specialization> {
    try {
      return await this.specializationModel.findByIdAndUpdate(id, updateSpecializationDto, { new: true }).exec();
    } catch (error) {
      throw new InternalServerErrorException(`Error updating specialization: ${error.message}`);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.specializationModel.deleteOne({ _id: id }).exec();
      return result.deletedCount > 0;
    } catch (error) {
      throw new InternalServerErrorException(`Error removing specialization: ${error.message}`);
    }
  }
}
