import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BillingModule } from './billing/billing.module';
import { PrescrModule } from './prescr/prescr.module';
import { NauthModule } from './nauth/nauth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ClinicModule } from './clinic/clinic.module';
import { SpecializationModule } from './specialization/specialization.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://shadowmonarch712:testuser@cluster0.mzexokf.mongodb.net/'), AuthModule, PatientModule, DoctorsModule, PrescrModule,ClinicModule, AppointmentsModule, MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: 'adityasrivastava0709@gmail.com',
        pass: 'rgwovfbhzznbinbi'
      }
    }
  }), BillingModule, NauthModule, ClinicModule, SpecializationModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    }],
})
export class AppModule { }
