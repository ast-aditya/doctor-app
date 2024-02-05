import { Controller, Post, Body, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
   @ApiBody({
    schema : {
        type: 'object',
        properties: {
            doc_id : {
                type : 'string',
                example : 'DOC0110S',
                description : 'this is a unique username'
            },
            clinic_id : {
                type: 'string',
                example: 'test',
                description: 'This contains password for the username'
            },
            pat_id : {
              type: 'string',
              example: 'test',
              description: 'patient id'
          },
            appoi_day : {
            type: 'string',
            example: 'test',
            description: 'appointment_day'
        },
            appoi_time_id : {
            type: 'string',
            example: 'test',
            description: 'appointment_time'
      },
            Meds : {
            type: 'string[]',
            example: 'test',
            description: 'list of the medicines'
    }
        }
    }
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