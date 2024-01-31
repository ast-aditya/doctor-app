import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientUser, PatientUserSchema } from 'src/patient/Schemas/patientUser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name : PatientUser.name, schema: PatientUserSchema }]),
    PassportModule,
    JwtModule.register({
      secret : 'abc123',
      signOptions : {expiresIn: '1h'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy]
})
export class AuthModule {}
