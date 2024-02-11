import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorProfile,DoctorProfileSchema } from './schemas/doctorsProfile.schema';

import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { UserService } from 'src/nauth/user.service';
import { AuthUserRegister, AuthUserRegistrationSchema } from 'src/nauth/schema/auth_register.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: DoctorProfile.name, schema: DoctorProfileSchema }]),
  MongooseModule.forFeature([{ name: AuthUserRegister.name, schema : AuthUserRegistrationSchema}]),
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
