// import { Module, OnModuleInit } from "@nestjs/common";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { ElasticsearchModule } from "@nestjs/elasticsearch";
// import { SearchService } from "./search.service";

// @Module({
//     imports: [
//         ConfigModule,
//         ElasticsearchModule.registerAsync({
//             imports: [ConfigModule],
//             useFactory: async (configService: ConfigService) => ({
//                 node: 'http://localhost:9200',
//                 // node: configService.get('ELASTICSEARCH_NODE'),
//                 maxRetries: 10,
//                 requestTimeout: 60000
//             }),
//             inject: [ConfigService], 
//         }),
//     ],
//     providers:[SearchService],
//     exports: [ElasticsearchModule],
// })
// export class SearchModule implements OnModuleInit{
//     constructor(private readonly searchService : SearchService){}
//     public async onModuleInit() {
//         await this.searchService.createIndex();
//     }
// }