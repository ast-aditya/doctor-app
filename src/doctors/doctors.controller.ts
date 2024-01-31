import { Body, Controller, Get, Post, Put, Req} from '@nestjs/common';
import { DoctorPrfDto } from './dto/doctorPrf.dto';
import { Request } from 'express';
import { DoctorsService } from './doctors.service';
import { DoctorUser } from './dto/doctorUser.dto';

@Controller('doctors')
export class DoctorsController {
    constructor(private doctorService : DoctorsService){}
    
    @Post()
    createDoctor(@Body() createDoctorDto : DoctorUser) {
        return this.doctorService.DoctorUserDto(createDoctorDto);
    }

    @Get('profile')
    getProfile(@Req() req: Request) {
        // req.user is typically populated in middleware
        const username = req.user;
        return username;  
    }

    @Put('profile')
    updateDoctorProfile(@Body() createDoctorsProfile: DoctorPrfDto, @Req() req: Request) {
    // return this.patientService.updatePatientUser(req.user, updateProfileDto);
    return this.doctorService.DoctorPrfDto(req.user, createDoctorsProfile);
}
}
