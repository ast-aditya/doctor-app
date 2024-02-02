import { Module } from '@nestjs/common';
import { prescrController } from './prescr.controller';
import { prescrService } from './prescr.service';
import { prescrSchema, prescriptionSchema } from './schemas/prescr.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: prescrSchema.name, schema: prescriptionSchema }])],

  controllers: [prescrController],
  providers: [prescrService]
})
export class PrescrModule {}
