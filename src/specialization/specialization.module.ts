import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';

@Module({
  providers: [SpecializationService],
  controllers: [SpecializationController]
})
export class SpecializationModule {}
