import { Controller, Post, Body, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { prescrService } from './prescr.service';
import { PrescriptionDTO } from './dtos/prescr.dto';
import { prescrSchema } from './schemas/prescr.schema';

@Controller('prescriptions')
export class prescrController {
  constructor(private readonly prescriptionService: prescrService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create prescription' })
   @ApiResponse({ status: 201, description: 'The patient has been successfully created.'})
   @ApiResponse({ status: 400, description: 'Bad Request.Username or password should not be empty.'})
   @ApiCreatedResponse({
    description: "prescription created successfully",
    type: prescrSchema
     })
  
   async create(@Body() prescriptionDTO: PrescriptionDTO): Promise<any> {
      return this.prescriptionService.create(prescriptionDTO);
  }

  @Get(':doc_id')
  async getPrescriptionsByDocId(@Param('doc_id') docId: string): Promise<prescrSchema[]> {
    console.log("the controller is working fine");
    try {
      const prescriptions = await this.prescriptionService.getPrescriptionsByDocId(docId);
      if (!prescriptions || prescriptions.length === 0) {
        throw new NotFoundException(`No prescriptions found for doc_id: ${docId}`);
      }
      return prescriptions;
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching prescriptions');
    }
  }
}