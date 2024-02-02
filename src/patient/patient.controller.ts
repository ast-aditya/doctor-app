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
                username: {
                    type: 'string',
                    example: 'testuser@gmail.com',
                    description: 'This is a unique username'
                },
                password: {
                    type: 'string',
                    example: 'test',
                    description: 'This contains password for the username'
                },
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
    @ApiBody({ type: createPatientProfile })
    updatePatientProfile(@Body() createPatientProfile: createPatientProfile, @Req() req: Request) {
        return this.patientService.createPatientProfile(req.user, createPatientProfile);
    }

    
    @ApiOperation({ summary: 'get patient profile' })
    @Get('profile')
    async getPatientProfile(@Req() req: Request) {
        return this.patientService.getPatientProfile(req.user);
    }
    @Get(':patientID/getProfile')
    async getPatientProfileByID(@Param('patientID') patientID: string) {
        console.log("get profile by id in controller")
        // console.log(patientID)
        return this.patientService.getProfileByID(patientID);
    }
    @Get('delete-profile')
    async deletePatientProfile(@Req() req: Request) {
    return this.patientService.deletePatientProfile(req.user);
  }
    @Get(':patientID/deleteProfile')
    async deletePatientProfileByID(@Param('patientID') patientID : string) {
    // return this.patientService.deletePatientProfile(patientID);
    return this.patientService.deleteProfileByID(patientID);
  }

    // @Post('addAppointment')
    // @ApiOperation({ summary: 'Add patient appointment' })
    // @ApiResponse({ status: 200, description: 'The appointment has been successfully added.' })
    // @ApiBody({ type: addPatientAppointments })
    // addPatientAppointment(@Body() AddPatientAppointments: addPatientAppointments, @Req() req: Request) {
    //     return this.patientService.addAppointment(req.user, AddPatientAppointments);
    // }

    // @Post('changeStatus/:appointmentId')
    // @ApiOperation({ summary: 'Change appointment status' })
    // @ApiResponse({ status: 200, description: 'The appointment status has been successfully changed.' })
    // @ApiParam({ name: 'appointmentId', type: 'string' })
    // async changeStatusAppointment(@Body('status') newStatus: string, @Req() req: Request, @Param('appointmentId') appointmentId: string) {
    //     const username = req.user;
    //     return this.patientService.changeStatusAppointment(username, appointmentId, newStatus);
    // }

    // @Post('addSummary/:appointmentId')
    // @ApiOperation({ summary: 'Add appointment summary' })
    // @ApiResponse({ status: 200, description: 'The appointment summary has been successfully added.' })
    // @ApiParam({ name: 'appointmentId', type: 'string' })
    // @ApiBody({ type: SummaryDTO })
    // async addSummary(@Body() summary: SummaryDTO, @Req() req: Request, @Param('appointmentId') appointmentId: string) {
    //     const username = req.user;
    //     return this.patientService.addAppointmentSummary(username, appointmentId, summary);
    // }

}
