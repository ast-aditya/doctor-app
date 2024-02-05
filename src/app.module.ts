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

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://shadowmonarch712:testuser@cluster0.mzexokf.mongodb.net/') , AuthModule, PatientModule,DoctorsModule,PrescrModule, AppointmentsModule, MailerModule.forRoot({
    transport: {
      host : 'smtp.gmail.com',
      auth : {
        user : 'adityasrivastava0709@gmail.com',
        pass : 'rgwovfbhzznbinbi'
      }
    }
  }), BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
