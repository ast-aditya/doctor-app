import { Controller, Post, Body, Get, Param, NotFoundException,Delete, Res } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorProfile } from "./schemas/doctorsProfile.schema"
import { ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { DoctorPrfDto } from './dto/doctorPrf.dto';
import { prescrSchema } from 'src/prescr/schemas/prescr.schema';
import { GetCurrentUserId } from 'src/common/decorators';
import { Response } from 'express';

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
  
   async createDoctor(@Body() create_Doctor_DTO: DoctorPrfDto,  @GetCurrentUserId() user_Id : string,@Res() res: Response): Promise<any> {
      return this.doctorProfileService.create(create_Doctor_DTO, user_Id);
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

  @Delete('delete/:doc_id')
  async delete(@Param('doc_id') docId: string): Promise<void> {
      const deleted = await this.doctorProfileService.delete(docId);
      if (!deleted) {
          throw new NotFoundException(`Prescription with ID "${docId}" not found`);
      }
  }
}

