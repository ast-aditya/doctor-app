import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientProfile, PatientProfileSchema } from 'src/patient/Schemas/patientProfile.schema';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema';
import { JwtMiddleware } from 'src/patient/middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PatientProfile.name, schema: PatientProfileSchema }]),
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    })],
  providers: [AppointmentsService],
  controllers: [AppointmentsController]
})
export class AppointmentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(AppointmentsController); // apply the middleware to the routes of PatientController
  }
}
