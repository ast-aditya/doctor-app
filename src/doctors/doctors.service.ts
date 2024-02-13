import { Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorProfile } from './schemas/doctorsProfile.schema';
import { DoctorPrfDto } from './dto/doctorPrf.dto';
import { UserService } from 'src/nauth/user.service';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(DoctorProfile.name) private doctorProfileModel: Model<DoctorProfile>,
    private UserService : UserService
  ) {}

  // async create(DoctorDTO: DoctorPrfDto): Promise<DoctorPrfDto> {
  //   const createdPrescription = new this.doctorProfileModel(DoctorDTO);
  //   return createdPrescription.save();
  // }
  async create(create_Doctor_DTO: DoctorPrfDto, user_Id : string): Promise<DoctorPrfDto> {
    try {
      const {user_Id,gender, specialization, address, education, experience, contactNumber } = create_Doctor_DTO;
      const user = await this.UserService.getUserbyId(user_Id);
      
        // const createdPrescription = new this.doctorProfileModel(create_Doctor_DTO);
        // const doctor_Profile = await createdPrescription.save();
        // return doctor_Profile;
      const newProfile = new this.doctorProfileModel({
        user_Id: user_Id,
        name: user.name,
        email: user.email, 
        gender: gender,
        specialization: specialization,
        address: {
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country
        },
        education: {
          degree: education.degree,
          university: education.university,
          year: education.year
        },
        // education: education.map(edu => ({
        //   degree: edu.degree,
        //   university: edu.university,
        //   year: edu.year
        // })),
        experience: {
          designation: experience.designation,
          organisation: experience.organisation,
          start_year: experience.start_year,
          end_year: experience.end_year
        },
        // experience: experience.map(exp => ({
        //   designation: exp.designation,
        //   organization: exp.organisation,
        //   start_Year: exp.start_year,
        //   end_Year: exp.end_year
        // })),
        contact: contactNumber
      });
  
      const doctor_Profile = await newProfile.save();
      console.log(`Doctor Profile created successfully with Id : ${doctor_Profile.id}`);
      return doctor_Profile;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while creating profile ${error.message}`,
      );
    }
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

  async delete(docId: string): Promise<boolean> {
    const result = await this.doctorProfileModel.deleteOne({ _id: docId });
    return result.deletedCount > 0;
  }

}
