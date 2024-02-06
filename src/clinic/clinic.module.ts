import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { clinicSchema, clinicschema } from './schema/clinic.schema';
import { AuthUserRegister, AuthUserRegistrationSchema } from 'src/nauth/schema/auth_register.schema';
import { NauthModule } from 'src/nauth/nauth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: clinicSchema.name, schema: clinicschema }]),
  MongooseModule.forFeature([{ name: AuthUserRegister.name, schema : AuthUserRegistrationSchema}]), NauthModule],
  providers: [ClinicService],
  controllers: [ClinicController]
})
export class ClinicModule {}
