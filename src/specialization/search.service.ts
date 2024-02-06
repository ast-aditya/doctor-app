import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export class SearchService { 
    constructor(private readonly esService : ElasticsearchService, private readonly configService : ConfigService){}

    public async createIndex(){
        // const index = this.configService.get('ELASTICSEARCH_INDEX')
        const index = 'specialization'
        console.log(index)
        const indexExists = await this.esService.indices.exists({index});
        if(!indexExists){
            this.esService.indices.create({
                index,
                body: {
                    "mappings": {
                        "properties": {
                            "LevelOfDifficulty": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            },
                            "doc_id": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            },
                            "specialization_name": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                },
                                "analyzer": "autocomplete",
                                "search_analyzer": "standard"
                            }
                        }
                    }
                }
            }).catch((err: any) => {
                console.log("first")
                console.log(err)
            });
        }
    }
    public async indexSpecialization(specialization : any){
        return await this.esService.index({
            index : 'specialization'!,
            body : specialization
        });
    }

    public async search(text : string){
        const body = await this.esService.search<any>({
            index : 'specialization',
            body:{
                query:{
                    multi_match:{
                        query:text,
                        fields:['specialization_name']
                    }
                }
            }
        })
        const hits = body.hits.hits;
        return hits.map((item:any) => item._source)
    }
}
