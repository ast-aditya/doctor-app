import { Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorProfile } from './schemas/doctorsProfile.schema';
import { DoctorPrfDto } from './dto/doctorPrf.dto';
@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(DoctorProfile.name) private doctorProfileModel: Model<DoctorProfile>,
  ) {}

  async create(DoctorDTO: DoctorPrfDto): Promise<DoctorPrfDto> {
    const createdPrescription = new this.doctorProfileModel(DoctorDTO);
    return createdPrescription.save();
  }

  async findAllProfiles(): Promise<DoctorProfile[]> {
    try {
      return await this.doctorProfileModel.find().exec();
    } catch (error) {
      throw new Error('Error fetching doctor profiles');
    }
  }

  async getDoctorByDocId(docId: string): Promise<DoctorProfile[]> {
    console.log("the service is fine");
    try {
      const doctors = await this.doctorProfileModel.find({ doc_id: docId }).exec();
      if (!doctors || doctors.length === 0) {
        throw new NotFoundException(`No prescriptions found for doc_id: ${docId}`);
      }
      return doctors;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching doctors from service');
      
    }
  }


}
