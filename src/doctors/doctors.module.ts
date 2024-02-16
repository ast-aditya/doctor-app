import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorProfile,DoctorProfileSchema } from './schemas/doctorsProfile.schema';

import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { UserService } from 'src/nauth/user.service';
import { User, UserSchema } from 'src/nauth/schema/user.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: DoctorProfile.name, schema: DoctorProfileSchema }]),
  MongooseModule.forFeature([{ name: User.name, schema : UserSchema}]),
  JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' },
  })],
  
  providers: [DoctorsService, UserService],
  controllers: [DoctorsController]
})
export class DoctorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(DoctorsController);
}
}
