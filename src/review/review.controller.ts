import { Controller, Get, Post, Body, Param, Put, Delete,NotFoundException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { Review } from './schemas/review.schema';
import { ReviewService } from './review.service';
import { ReviewDto } from './dtos/review.dto';
import { Public } from 'src/common/decorators';
import { InternalServerErrorException } from '@nestjs/common';


@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Public()
  @Post()
  async create(@Body() createReviewDto: ReviewDto): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }
  /////i am adding here////
  

  @Public()
  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }
  @Public()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findById(id);
  }
  @Public()
  @Get('patient/:patientId')
  async findByPatientId(@Param('patientId') patientId: string): Promise<Review[]> {
    return this.reviewService.findByPatientId(patientId);
  }
  @Public()
  @Get('doctor/:doctorId')
  async findByDoctorId(@Param('doctorId') doctorId: string): Promise<Review[]> {
    return this.reviewService.findByDoctorId(doctorId);
  }
  @Public()
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Review[]> {
    return this.reviewService.findByEmail(email);
  }
  @Public()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: ReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }
  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Review> {
    return this.reviewService.delete(id);
  }
}