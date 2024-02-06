import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { SpecializationSchema, specSchema } from './schema/specialization.schema';
import { AuthUserRegister, AuthUserRegistrationSchema } from 'src/nauth/schema/auth_register.schema';
import { NauthModule } from 'src/nauth/nauth.module';
import { UserService } from 'src/nauth/user.service';




@Module({
  imports: [MongooseModule.forFeature([{ name: SpecializationSchema.name, schema: specSchema }]),
  MongooseModule.forFeature([{ name: AuthUserRegister.name, schema : AuthUserRegistrationSchema}]), NauthModule],

  providers: [SpecializationService,UserService],
  controllers: [SpecializationController]
})
export class SpecializationModule {}
