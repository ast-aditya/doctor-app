import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { clinicSchema, clinicschema } from './schema/clinic.schema';
import { User, UserSchema } from 'src/nauth/schema/user.schema';
import { NauthModule } from 'src/nauth/nauth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: clinicSchema.name, schema: clinicschema }]),
  MongooseModule.forFeature([{ name: User.name, schema : UserSchema}]), NauthModule],
  providers: [ClinicService],
  controllers: [ClinicController]
})
export class ClinicModule {}
