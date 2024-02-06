import { Body, Controller, Get, Param, Post,Delete, NotFoundException, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { ClinicDTO } from './dtos/clinic.dto';
import { ClinicService } from './clinic.service';
import { Response } from 'express';



@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicService: ClinicService) {}

    @Public()
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create clinic' })
    
    async create(@Body() clinicDTO: ClinicDTO, @Res() res: Response): Promise<any> {
      const data = await this.clinicService.create(clinicDTO);
      return res.status(201).json({data})
    }
    
    @Public()
    @Get(':clinic_id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get clinic by ID' })
    async getClinicById(@Param('clinic_id') clinicId: string, @Res() res: Response): Promise<any> {
      const data = await this.clinicService.getClinicById(clinicId);
      return res.status(200).json({data});
    }
    
    @Public()
    @Get('delete/:clinic_id')
    @HttpCode(HttpStatus.OK)
      @ApiOperation({ summary: 'Delete clinic by ID' })
      async delete(@Param('clinic_id') clinic_id: string, @Res() res: Response): Promise<any> {
          const data = await this.clinicService.delete(clinic_id);
          return res.status(200).json({ msg: 'deleted' })
      }
      
      @Public()
      @Get()
      @HttpCode(HttpStatus.OK)
      @ApiOperation({ summary: 'Get all clinics' })
      async getAllClinics(@Res() res: Response): Promise<any> {
          const data = await this.clinicService.getAllClinics();
          return res.status(200).json({data});
      }
      
      @Public()
      @Post(':clinic_id/addDoctor/:doctorId')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({ summary: 'Add a doctor to a clinic' })
      async addDoctor(@Param('clinic_id') clinicId: string, @Param('doctorId') doctorId: string, @Res() res: Response): Promise<any> {
        const data = await this.clinicService.addDoctor(clinicId, doctorId);
          return res.status(200).json({data});
      }

      @Public()
      @Post(':clinic_id')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({ summary: 'Update clinic by ID' })
      async update(@Param('clinic_id') clinicId: string, @Body() clinicDTO: ClinicDTO, @Res() res: Response): Promise<any> {
          const data = await this.clinicService.update(clinicId, clinicDTO);
          return res.status(200).json({data});
      }

      @Public()
      @Get('doctor/:doctorId')
      @HttpCode(HttpStatus.OK)
      @ApiOperation({ summary: 'Get all clinics for a doctor' })
      async getClinicsByDoctor(@Param('doctorId') doctorId: string, @Res() res: Response): Promise<any> {
          const data = await this.clinicService.getClinicsByDoctor(doctorId);
          return res.status(200).json({data});
      }

      
  }