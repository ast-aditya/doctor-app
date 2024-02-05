import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { prescrSchema, prescriptionSchema } from 'src/prescr/schemas/prescr.schema';
import { clinicSchema, clinicschema } from './schema/clinic.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: clinicSchema.name, schema: clinicschema }])],
  providers: [ClinicService],
  controllers: [ClinicController]
})
export class ClinicModule {}
