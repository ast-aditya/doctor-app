import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://shadowmonarch712:testuser@cluster0.mzexokf.mongodb.net/') , AuthModule, PatientModule,DoctorsModule, AppointmentsModule, MailerModule.forRoot({
    transport: {
      host : 'smtp.gmail.com',
      auth : {
        user : 'adityasrivastava0709@gmail.com',
        pass : 'rgwovfbhzznbinbi'
      }
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
