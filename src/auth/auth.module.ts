import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
// import { PatientUser, PatientUserSchema } from 'src/patient/Schemas/patientUser.schema';
import { UserLogin, UserLoginSchema } from './schema/UserLogin.schema';
import { UserRegister, UserRegistrationSchema } from './schema/UserRegistration.schema';
import { JwtMiddleware } from 'src/patient/middlewares/jwt.middleware';

@Module({
  imports: [
    // MongooseModule.forFeature([{name : PatientUser.name, schema: PatientUserSchema }]),
    MongooseModule.forFeature([{name : UserLogin.name, schema: UserLoginSchema }]),
    MongooseModule.forFeature([{name : UserRegister.name, schema: UserRegistrationSchema }]),
    PassportModule,
    JwtModule.register({
      secret : 'abc123',
      signOptions : {expiresIn: '1h'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(AuthController); // apply the middleware to the routes of PatientController
  }
}
