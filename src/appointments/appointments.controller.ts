import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { Request } from 'express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @ApiOperation({ summary: 'create Appointment' })
  @Post(':doctorID')

  async createAppointment(@Param('doctorID') doctorID: string, @Body() createAppointmentDto: CreateAppointmentDto,@GetCurrentUserId() user_Id: string) {
    return this.appointmentService.createAppointment(doctorID, user_Id, createAppointmentDto);
  }

  @ApiOperation({ summary: 'Get all appointments' })
  @Get()
  async getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  @ApiOperation({ summary: 'delete appointment by appointment id' })
  @Get(':appointmentID')
  async deleteAppointment(@Param('appointmentID') appointmentID: string) {
    return this.appointmentService.deleteAppointment(appointmentID);
  }
  @ApiOperation({ summary: 'get patients appointment by appointment id' })
  @Get('patient/:patientID')
  async getAppointmentsByPatient(@Param('patientID') patientID: string) {
  return this.appointmentService.getAppointmentsByPatient(patientID);
  }

  @ApiOperation({ summary: 'get doctors appointment by appointment id' })
  @Get('doctor/:doctorID')
  async getAppointmentsByDoctor(@Param('doctorID') doctorID: string) {
  return this.appointmentService.getAppointmentsByDoctor(doctorID);
  }

  @ApiOperation({ summary: 'change appointment status' })
  @Post(':appointmentID/status')
    async changeAppointmentStatus(@Param('appointmentID') appointmentID: string, @Req() req: Request) {
    let statusObject = req.body;
    let status = statusObject.status;
    return this.appointmentService.changeAppointmentStatus(appointmentID, status);
    }

    @ApiOperation({ summary: 'get scheduled appointments for logged in patient' })
    @Get('scheduled/patient')
    async getScheduledAppointmentsForPatient( @Req() req: Request){
        const user = req.user;
        return this.appointmentService.getScheduledAppointmentsForPatient(user);
    }
    @ApiOperation({ summary: 'get scheduled appointments for logged in doctor' })
    @Get('doctor/scheduled')
    async getScheduledAppointmentsForDoctor( @Req() req: Request){
        const user = req.user;
        return this.appointmentService.getScheduledAppointmentsForDoctor(user);
    }

}