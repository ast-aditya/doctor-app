import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorProfile } from "./schemas/doctorsProfile.schema"
import { ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { DoctorPrfDto } from './dto/doctorPrf.dto';
import { prescrSchema } from 'src/prescr/schemas/prescr.schema';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorProfileService: DoctorsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create Doctor' })
   @ApiResponse({ status: 201, description: 'The Doctor has been successfully created.'})
   @ApiResponse({ status: 400, description: 'Bad Request.'})
   @ApiCreatedResponse({
    description: "Doctor created successfully and fully",
    type: DoctorPrfDto
     })
  
   async createDoctor(@Body() DoctorDTO: DoctorPrfDto): Promise<any> {
      return this.doctorProfileService.create(DoctorDTO);
  }

  @Get()
  async getAllProfiles(): Promise<DoctorProfile[]> {
    return this.doctorProfileService.findAllProfiles();
  }

  @Get(':doc_id')
  async getPrescriptionsByDocId(@Param('doc_id') docId: string): Promise<DoctorProfile[]> {
    console.log("the controller is working fine");
      const tempDoctor = await this.doctorProfileService.getDoctorByDocId(docId);
      return tempDoctor;
     
  }
  }


