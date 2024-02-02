import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { Request } from 'express';

@Controller('appointment')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Post(':doctorID')
  async createAppointment(@Param('doctorID') doctorID: string, @Body() createAppointmentDto: CreateAppointmentDto,@Req() req: Request) {
    const user = req.user;
    return this.appointmentService.createAppointment(doctorID, user, createAppointmentDto);
  }

  @Get()
  async getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  @Get(':appointmentID')
  async deleteAppointment(@Param('appointmentID') appointmentID: string) {
    return this.appointmentService.deleteAppointment(appointmentID);
  }
  @Get('patient/:patientID')
  async getAppointmentsByPatient(@Param('patientID') patientID: string) {
  return this.appointmentService.getAppointmentsByPatient(patientID);
  }

  @Get('doctor/:doctorID')
  async getAppointmentsByDoctor(@Param('doctorID') doctorID: string) {
  return this.appointmentService.getAppointmentsByDoctor(doctorID);
  }

  @Post(':appointmentID/status')
    async changeAppointmentStatus(@Param('appointmentID') appointmentID: string, @Req() req: Request) {
    let statusObject = req.body;
    let status = statusObject.status;
    return this.appointmentService.changeAppointmentStatus(appointmentID, status);
    }

    @Get('scheduled/patient')
    async getScheduledAppointmentsForPatient( @Req() req: Request){
        // console.log("user")
        const user = req.user;
        return this.appointmentService.getScheduledAppointmentsForPatient(user);
    }
    @Get('doctor/scheduled')
    async getScheduledAppointmentsForDoctor( @Req() req: Request){
        const user = req.user;
        return this.appointmentService.getScheduledAppointmentsForDoctor(user);
    }

}