import { Controller, Post, Body, Get, NotFoundException, Param, Put,Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { prescrService } from './prescr.service';
import { PrescriptionDTO } from './dtos/prescr.dto';
import { prescrSchema } from './schemas/prescr.schema';
import { Public } from 'src/common/decorators';


@Controller('prescriptions')
export class prescrController {
  constructor(private readonly prescriptionService: prescrService) {}
  @Public()
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

    @Public()
  @Get(':doc_id')
  async getPrescriptionsByDocId(@Param('doc_id') docId: string): Promise<prescrSchema[]> {
    console.log("the controller is working fine");
      const prescriptions = await this.prescriptionService.getPrescriptionsByDocId(docId);
      return prescriptions;
  }
  @Public()
  @Put(':doc_id')
  update(@Param('doc_id') docId: string, @Body() prescription: PrescriptionDTO): Promise<PrescriptionDTO> {
      return this.prescriptionService.update(docId, prescription);
  }
  @Public()
  @Delete('delete/:doc_id')
  async delete(@Param('doc_id') docId: string): Promise<void> {
      const deleted = await this.prescriptionService.delete(docId);
      if (!deleted) {
          throw new NotFoundException(`Prescription with ID "${docId}" not found`);
      }
  }

}