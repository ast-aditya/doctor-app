import { Body, Controller, Get, Param, Post,Delete, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { clinicSchema } from './schema/clinic.schema';
import { ClinicDTO } from './dtos/clinic.dto';
import { ClinicService } from './clinic.service';
import { prescrSchema } from 'src/prescr/schemas/prescr.schema';



@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicService: ClinicService) {}

    @Public()
  @Post('create')
  @ApiOperation({ summary: 'Create prescription' })
   @ApiResponse({ status: 201, description: 'The patient has been successfully created.'})
   @ApiResponse({ status: 400, description: 'Bad Request.Username or password should not be empty.'})
   @ApiCreatedResponse({
    description: "prescription created successfully",
    type: clinicSchema
     })
  
    async create(@Body() clinicDTO: ClinicDTO): Promise<any> {
        return this.clinicService.create(clinicDTO);
    }

    @Public()
  @Get(':clinic_id')
  async getClinicsByClinicId(@Param('clinic_id') clinicId: string): Promise<clinicSchema[]> {
    console.log("the controller is working fine");
      const clinics = await this.clinicService.getClinicsByClinicId(clinicId);
      return clinics;
  }

  @Public()
  @Delete('delete/:clinic_id')
  async delete(@Param('clinic_id') clinic_id: string): Promise<void> {
      const deleted = await this.clinicService.delete(clinic_id);
      if (!deleted) {
          throw new NotFoundException(`Prescription with ID "${clinic_id}" not found`);
      }
  }
  
}
