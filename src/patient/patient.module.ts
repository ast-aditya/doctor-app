import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientUser, PatientUserSchema } from './Schemas/patientUser.schema';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PatientProfile, PatientProfileSchema } from './Schemas/patientProfile.schema';
import { CreateAppointment, CreateAppointmentSchema } from './Schemas/patientAppointment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PatientUser.name, schema: PatientUserSchema }]),
  MongooseModule.forFeature([{ name: PatientProfile.name, schema: PatientProfileSchema }]),
  MongooseModule.forFeature([{ name: CreateAppointment.name, schema: CreateAppointmentSchema }]),
  JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [PatientService],
  controllers: [PatientController] 
})
export class PatientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(PatientController); // apply the middleware to the routes of PatientController
  }
}
