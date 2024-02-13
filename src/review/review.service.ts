import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { ReviewDto } from './dtos/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}
 
  async create(createReviewDto: ReviewDto): Promise<Review> {
    try{
    const createdReview = new this.reviewModel(createReviewDto);
    await createdReview.save();
    return createdReview;
    }catch(error){
        console.error('Error occurred while creating review:', error);
        throw error;
    }
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }                       //////////// i have to add find by dr id also//////

  async findByDoctorId(doctorId: string): Promise<Review[]> {
    try {
      const reviews = await this.reviewModel.find({ doctor_id: doctorId }).exec();
      return reviews;
    } catch (error) {
      console.error('Error occurred while finding reviews by doctor ID:', error);
      throw error;
    }
  }
  
  async findByPatientId(patientId: string): Promise<Review[]> {
    return this.reviewModel.find({ patient_id: patientId }).exec();
  }

  async findByEmail(email: string): Promise<Review[]> {
    return this.reviewModel.find({ 'story.email': email }).exec();
  }

  async update(id: string, updateReviewDto: ReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!updatedReview) {
      throw new NotFoundException('Review not found');
    }
    return updatedReview;
  }

  async delete(id: string): Promise<Review> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deletedReview) {
      throw new NotFoundException('Review not found');
    }
    return deletedReview;
  }
}

