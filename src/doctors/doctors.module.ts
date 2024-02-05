import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorProfile,DoctorProfileSchema } from './schemas/doctorsProfile.schema';

import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [ MongooseModule.forFeature([{ name: DoctorProfile.name, schema: DoctorProfileSchema }]),
  JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' },
  })],
  
  providers: [DoctorsService],
  controllers: [DoctorsController]
})
export class DoctorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(DoctorsController);
}
}
