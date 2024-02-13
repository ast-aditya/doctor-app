import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SpecializationSchema, specializationSchema } from './schema/specialization.schema';
import { specialDTO } from './dtos/specialization.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { SearchService } from './search.service';



@Injectable()
export class SpecializationService {
    constructor(@InjectModel(SpecializationSchema.name) private specialModel: Model<specializationSchema>) {}
    
    
    async create(SpecialDTO: specialDTO): Promise<any> {
    const { specialization_name, LevelOfDifficulty, doc_id } = SpecialDTO;
    try {
      // const existingSpecial = await this.specialModel.findOne({ specialization_id });
      // if (existingSpecial) {
      //   throw new ConflictException('Specialization with the same name already exists');
      // }
      const newSpecial = new this.specialModel({
        specialization_name,
        LevelOfDifficulty,
        doc_id
      });
      const special = await newSpecial.save(); 
      // this.searchService.indexSpecialization(special)
      // this.searchService.indexSpecialization({ specialization_name, LevelOfDifficulty, doc_id });
      console.log(`Specialization created successfully with Id : ${newSpecial.id}`);

      return special;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error while creating Specialization ${error.message}`,
      );
    }
  }
  // public async search(text: string){
  //   return await this.searchService.search(text);
  // }

  async getSpecialById(specialization_id: string){
    try {
      const special = await this.specialModel.findById(specialization_id);
      if (!special) {
        throw new NotFoundException(`Specialization with ID "${specialization_id}" not found`);
      }
      return special;
    } catch (error) {
      throw new InternalServerErrorException(`Error while getting Specialization ${error.message}`);
    }
  }

  async delete(specialization_id: string){
    try {
      const deleted = await this.specialModel.deleteOne({ specialization_id });
      if (!deleted) {
        throw new NotFoundException(`Specialization with ID "${specialization_id}" not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error while deleting Specialization ${error.message}`);
    }
  }
  
  async getAllspecials() {
    try {
      return await this.specialModel.find();
    } catch (error) {
      throw new InternalServerErrorException(`Error while getting all Specializations ${error.message}`);
    }
  }
  
  async addspecialization(specialization_id: string, doc_id: string) {
    try {
      const special = await this.getSpecialById( specialization_id );
      if (!special) {
        throw new NotFoundException(`Specialization with ID "${specialization_id}" not found`);
      }
      special.doc_id.push(doc_id);
      return await special.save();
    } catch (error) {
      throw new InternalServerErrorException(`Error while adding doctor to specialization ${error.message}`);
    }
  }


  async update(specialization_id: string, specialDTO: specialDTO){
    try {
      const { specialization_name, LevelOfDifficulty, doc_id } = specialDTO;
      const existingSpecial = await this.getSpecialById(specialization_id);
      console.log(existingSpecial)
      if (!existingSpecial) {
        throw new NotFoundException(`Specialization with ID "${specialization_id}" not found`);
      }
      const updatedSpecial = {
        specialization_id,
        specialization_name, 
        LevelOfDifficulty, 
        doc_id
      };
      const special =  await this.specialModel.updateOne({ _id: specialization_id }, { $set: updatedSpecial }, { upsert: true });
      return {special, updatedSpecial};
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error while updating Specialization ${error.message}`,
      );
    }
  }
  async getSpecialByDoctor(doc_id: string) {
    try {
      const specials = await this.specialModel.find({ Doc_id: doc_id });
      return Promise.all(specials.map(async special => {
        return this.getSpecialById(special._id);
      }));
    } catch (error) {
      throw new InternalServerErrorException(`Error while getting Specializations by doctor ${error.message}`);
    }
  }
  
  


}
