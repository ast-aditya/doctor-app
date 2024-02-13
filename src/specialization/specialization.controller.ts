// // specialization.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Specialization } from './schema/specialization.schema';
import { SpecializationService } from './specialization.service';
import { SpecialDTO } from './dtos/specialization.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';

@ApiTags('Specializations')
@Controller('specializations')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}
  @Public()
  @Post()
  @ApiOperation({ summary: 'Create Specialization' })
  @ApiResponse({ status: 201, description: 'The specialization has been successfully created.', type: Specialization })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createSpecializationDto: SpecialDTO): Promise<Specialization> {
    try {
      return await this.specializationService.create(createSpecializationDto);
    } catch (error) {
      throw new InternalServerErrorException(`Error creating specialization: ${error.message}`);
    }
  }
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all Specializations' })
  @ApiResponse({ status: 200, description: 'Returns all specializations.', type: [Specialization] })
  async findAll(): Promise<Specialization[]> {
    try {
      return await this.specializationService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching specializations: ${error.message}`);
    }
  }
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get Specialization by ID' })
  @ApiResponse({ status: 200, description: 'Returns the specialization.', type: Specialization })
  @ApiResponse({ status: 404, description: 'Specialization not found.' })
  async findOne(@Param('id') id: string): Promise<Specialization> {
    try {
      const specialization = await this.specializationService.findOne(id);
      if (!specialization) {
        throw new NotFoundException(`Specialization with ID "${id}" not found`);
      }
      return specialization;
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching specialization: ${error.message}`);
    }
  }
  @Public()
@Get('doctor/:ids')
async findByDoctorIds(@Param('ids') ids: string) {
  const doctorIds = ids.split(','); // Split the comma-separated string into an array of IDs
  return this.specializationService.findByDoctorId(doctorIds);
}

  
  @Public()
  @Put(':id')
  @ApiOperation({ summary: 'Update Specialization by ID' })
  @ApiResponse({ status: 200, description: 'The specialization has been successfully updated.', type: Specialization })
  @ApiResponse({ status: 404, description: 'Specialization not found.' })
  async update(@Param('id') id: string, @Body() updateSpecializationDto: SpecialDTO): Promise<Specialization> {
    try {
      const specialization = await this.specializationService.update(id, updateSpecializationDto);
      if (!specialization) {
        throw new NotFoundException(`Specialization with ID "${id}" not found`);
      }
      return specialization;
    } catch (error) {
      throw new InternalServerErrorException(`Error updating specialization: ${error.message}`);
    }
  }
  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Specialization by ID' })
  @ApiResponse({ status: 204, description: 'The specialization has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Specialization not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const deleted = await this.specializationService.remove(id);
      if (!deleted) {
        throw new NotFoundException(`Specialization with ID "${id}" not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error removing specialization: ${error.message}`);
    }
  }
}
