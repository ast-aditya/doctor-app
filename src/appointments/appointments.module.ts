import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientProfile, PatientProfileSchema } from 'src/patient/Schemas/patientProfile.schema';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema';
import { JwtMiddleware } from 'src/patient/middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/nauth/user.service';
import { AuthUserRegister, AuthUserRegistrationSchema } from 'src/nauth/schema/auth_register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PatientProfile.name, schema: PatientProfileSchema }]),
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
    MongooseModule.forFeature([{ name: AuthUserRegister.name, schema: AuthUserRegistrationSchema }]),
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    })],
  providers: [AppointmentsService, UserService],
  controllers: [AppointmentsController],
})
export class AppointmentsModule { }
// export class AppointmentsModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(JwtMiddleware)
//       .forRoutes(AppointmentsController); // apply the middleware to the routes of PatientController
//   }
// }
