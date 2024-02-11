import { Module } from '@nestjs/common';
import { NauthService } from './nauth.service';
// import { NauthController } from './nauth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserRegister, AuthUserRegistrationSchema } from './schema/auth_register.schema';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: AuthUserRegister.name, schema : AuthUserRegistrationSchema}
    ]),
    JwtModule.register({}),
  ],
  providers: [NauthService, AtStrategy, RtStrategy, UserService, GoogleStrategy],
  controllers: [UserController]
})
export class NauthModule {}
