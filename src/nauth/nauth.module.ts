import { Module } from '@nestjs/common';
import { NauthService } from './nauth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { EmailService } from 'src/send-email/send-email.service';
import { SendgridEmailService } from 'src/send-email/send_Grid-email.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema : UserSchema}
    ]),
    JwtModule.register({}),
  ],
  providers: [
    NauthService,
    AtStrategy,
    RtStrategy,
    UserService,
    GoogleStrategy,
    {
      provide: EmailService,
      useClass: SendgridEmailService,
    },
  ],
  controllers: [UserController]
})
export class NauthModule {}
