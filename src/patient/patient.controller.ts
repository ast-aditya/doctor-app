import { Body, Controller, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePatientUser } from './dto/createPatientUser.dto';
import { PatientService } from './patient.service';
import { Request } from 'express';
import { createPatientProfile } from './dto/createPatientProfile.dto';
import { addPatientAppointments } from './dto/addPatientAppointments.dto';
import { SummaryDTO } from './dto/appointmentSummary.dto';
import { PatientUser } from './Schemas/patientUser.schema';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService) { }

    @Post('profile')
    @ApiOperation({ summary: 'create patient profile' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                firstname: {
                    type: 'string',
                    example: 'John',
                    description: 'The first name of the patient'
                },
                secondname: {
                    type: 'string',
                    example: 'Doe',
                    description: 'The second name of the patient'
                },
                age: {
                    type: 'number',
                    example: 30,
                    description: 'The age of the patient'
                },
                gender: {
                    type: 'string',
                    example: 'Male',
                    description: 'The gender of the patient'
                },
                dob: {
                    type: 'string',
                    format: 'date',
                    example: '1990-01-01',
                    description: 'The date of birth of the patient'
                },
                address: {
                    type: 'object',
                    properties: {
                        line1: {
                            type: 'string',
                            example: '123 Main St',
                            description: 'The first line of the address'
                        },
                        line2: {
                            type: 'string',
                            example: 'Apt 4B',
                            description: 'The second line of the address'
                        },
                        city: {
                            type: 'string',
                            example: 'New York',
                            description: 'The city of the address'
                        },
                        state: {
                            type: 'string',
                            example: 'NY',
                            description: 'The state of the address'
                        },
                        pincode: {
                            type: 'number',
                            example: 10001,
                            description: 'The pincode of the address'
                        },
                    },
                    description: 'The address of the patient'
                },
                contact: {
                    type: 'number',
                    example: 1234567890,
                    description: 'The contact number of the patient'
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'The patient profile has been successfully updated.' })
    updatePatientProfile(@Body() createPatientProfile: createPatientProfile, @Req() req: Request) {
        return this.patientService.createPatientProfile(req.user, createPatientProfile);
    }

    
    @ApiOperation({ summary: 'get patient profile for logged in user' })
    @Get('profile')
    async getPatientProfile(@Req() req: Request) {
        return this.patientService.getPatientProfile(req.user);
    }

    @ApiOperation({ summary: 'get patient profile by id' })
    @Get(':patientID/getProfile')
    async getPatientProfileByID(@Param('patientID') patientID: string) {
        return this.patientService.getProfileByID(patientID);
    }

    @ApiOperation({ summary: 'delete patient profile for logged in user' })
    @Get('delete-profile')
    async deletePatientProfile(@Req() req: Request) {
    return this.patientService.deletePatientProfile(req.user);
  }

    @ApiOperation({ summary: 'delete patient profile by id' })
    @Get(':patientID/deleteProfile')
    async deletePatientProfileByID(@Param('patientID') patientID : string) {
    return this.patientService.deleteProfileByID(patientID);
  }

}
