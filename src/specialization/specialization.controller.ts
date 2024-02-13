import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { specialDTO } from './dtos/specialization.dto';
import { Public } from 'src/common/decorators';

@Controller('specialization')
export class SpecializationController {
    constructor(private readonly specializationService: SpecializationService){}
    @Public()
    @Post()
  async create(@Body() specialDTO: specialDTO) {
    return this.specializationService.create(specialDTO);
  }
    // @Public()
    // @Get('search')
  // async search(@Query('text') text: string) {
  //   return this.specializationService.search(text);
  // }
}
