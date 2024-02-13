import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { SpecializationSchema, specSchema } from './schema/specialization.schema';
import { AuthUserRegister, AuthUserRegistrationSchema } from 'src/nauth/schema/auth_register.schema';
import { NauthModule } from 'src/nauth/nauth.module';
import { UserService } from 'src/nauth/user.service';
// import { SearchService } from './search.service';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
  imports: [MongooseModule.forFeature([{ name: SpecializationSchema.name, schema: specSchema }]),
//   ElasticsearchModule.registerAsync({
//     imports: [ConfigModule],
//     useFactory: async (configService: ConfigService) => ({
//         node: 'http://localhost:9200',
//         // node: configService.get('ELASTICSEARCH_NODE'),
//         maxRetries: 10,
//         requestTimeout: 60000
//     }),
//     inject: [ConfigService], 
// }),
  MongooseModule.forFeature([{ name: AuthUserRegister.name, schema : AuthUserRegistrationSchema}]), NauthModule],

  providers: [SpecializationService,UserService],
  controllers: [SpecializationController]
})
export class SpecializationModule {}
