import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { createPatientProfile } from './dto/createPatientProfile.dto';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { Response } from "express";
import { updatePatientProfile } from './dto/updatePatientProfile.dto';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService) { }


    @Post('create-profile')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create patient' })
    @ApiResponse({ status: 201, description: 'The patient has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.Username or password should not be empty.' })
    async createPatient(@Body() createPatientDto: createPatientProfile, @GetCurrentUserId() user_Id : string,@Res() res: Response,) {
        // return this.patientService.createPatientProfile(createPatientDto, user_Id);
        const data = await this.patientService.createPatientProfile(createPatientDto, user_Id);
        return res.status(201).json(data);
    }

    @Post('update-profile')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update patient profile' })
    @ApiResponse({ status: 200, description: 'The patient profile has been successfully updated.' })
    async updatePatientProfile(@Body() updatePatientProfile: updatePatientProfile, @GetCurrentUserId() user_Id : string,@Res() res: Response,) {
        const data = await this.patientService.updatePatientProfile(updatePatientProfile, user_Id);
        return res.status(200).json(data)
    }

    
    @ApiOperation({ summary: 'get patient profile for logged in user' })
    @Get('profile')
    @HttpCode(HttpStatus.OK)
    async getPatientProfile(@GetCurrentUserId() user_Id : string, @Res() res : Response) {
        const data = this.patientService.getPatientProfile(user_Id);
        return res.status(200).json(data)
    }

    @Public()
    @ApiOperation({ summary: 'get patient profile by id' })
    @Get(':patientID/getProfile')
    @HttpCode(HttpStatus.OK)
    async getPatientProfileByID(@Param('patientID') patientID: string ,@Res() res:Response) {
        const data = this.patientService.getProfileByID(patientID);
        return res.status(200).json(data)
    }

    @ApiOperation({ summary: 'delete patient profile for logged in user' })
    @Get('delete-profile')
    @HttpCode(HttpStatus.OK)
    async deletePatientProfile(@GetCurrentUserId() user_Id : string, @Res() res: Response,) {
    await this.patientService.deletePatientProfile(user_Id);
    return res.status(200).json({ msg: 'deleted' })
}

    @ApiOperation({ summary: 'delete patient profile by id' })
    @Get(':patientID/deleteProfile')
    @HttpCode(HttpStatus.OK)
    async deletePatientProfileByID(@Param('patientID') patientID : string, @Res() res: Response,) {
        await this.patientService.deleteProfileByID(patientID);
        return res.status(200).json({ msg: 'deleted' })
        
    }

}
