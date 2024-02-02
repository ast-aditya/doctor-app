import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { Request } from 'express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @ApiOperation({ summary: 'create Appointment' })
  @Post(':doctorID')
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
            patientID: {
                type: 'string',
                example: '60d721bcb392d476c8f7c300',
                description: 'The ID of the patient'
            },
            date: {
                type: 'string',
                format: 'date',
                example: '2024-01-31',
                description: 'The date of the appointment'
            },
            time: {
                type: 'string',
                example: '10:30',
                description: 'The time of the appointment'
            },
            status: {
                type: 'string',
                example: 'Scheduled',
                description: 'The status of the appointment'
            },
            patient: {
                type: 'object',
                properties: {
                    firstname: {
                        type: 'string',
                        example: 'Aditya',
                        description: 'The first name of the patient'
                    },
                    secondname: {
                        type: 'string',
                        example: 'Kumar',
                        description: 'The second name of the patient'
                    },
                    age: {
                        type: 'number',
                        example: 21,
                        description: 'The age of the patient'
                    },
                    gender: {
                        type: 'string',
                        example: 'male',
                        description: 'The gender of the patient'
                    },
                    dob: {
                        type: 'string',
                        format: 'date',
                        example: '2003-01-01',
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
                            city: {
                                type: 'string',
                                example: 'New Delhi',
                                description: 'The city of the address'
                            },
                            state: {
                                type: 'string',
                                example: 'Delhi',
                                description: 'The state of the address'
                            },
                            pincode: {
                                type: 'number',
                                example: 110001,
                                description: 'The pincode of the address'
                            },
                        },
                        description: 'The address of the patient'
                    },
                    contact: {
                        type: 'number',
                        example: 9876543210,
                        description: 'The contact number of the patient'
                    },
                },
                description: 'The patient details'
            },
            clinic: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        example: 'Health Clinic',
                        description: 'The name of the clinic'
                    },
                    address: {
                        type: 'string',
                        example: '123 Main St, New York, NY',
                        description: 'The address of the clinic'
                    },
                    contactNumber: {
                        type: 'string',
                        example: '0987654321',
                        description: 'The contact number of the clinic'
                    },
                    email: {
                        type: 'string',
                        example: 'healthclinic@gmail.com',
                        description: 'The email of the clinic'
                    },
                    schedule: {
                        type: 'object',
                        properties: {
                            day: {
                                type: 'string',
                                example: 'Monday',
                                description: 'The day of the schedule'
                            },
                            openingTime: {
                                type: 'string',
                                example: '09:00',
                                description: 'The opening time of the clinic'
                            },
                            closingTime: {
                                type: 'string',
                                example: '17:00',
                                description: 'The closing time of the clinic'
                            },
                        },
                        description: 'The schedule of the clinic'
                    },
                },
                description: 'The clinic details'
            },
        },
    },
})

  async createAppointment(@Param('doctorID') doctorID: string, @Body() createAppointmentDto: CreateAppointmentDto,@Req() req: Request) {
    const user = req.user;
    return this.appointmentService.createAppointment(doctorID, user, createAppointmentDto);
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