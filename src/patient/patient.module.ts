import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PatientProfile, PatientProfileSchema } from './Schemas/patientProfile.schema';
import { UserService } from 'src/nauth/user.service';
import { User, UserSchema } from 'src/nauth/schema/user.schema';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: PatientProfile.name, schema: PatientProfileSchema }]),
  MongooseModule.forFeature([{ name: User.name, schema : UserSchema}]),
  JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [PatientService, UserService],
  controllers: [PatientController] 
})
// export class PatientModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(JwtMiddleware)
//       .forRoutes(PatientController); // apply the middleware to the routes of PatientController
//   }
// }
export class PatientModule{}
