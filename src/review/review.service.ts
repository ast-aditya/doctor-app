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
    const savedReview = await createdReview.save();
    console.log('Review created successfully'); 
      return savedReview;
    }catch(error){
        console.error('Error occurred while creating review:', error);
        throw error;
    }
  }

  async findAll(): Promise<Review[]> {
    const reviews =await this.reviewModel.find().exec();
    console.log('All reviews retrieved successfully');
    return reviews;
  }

  async findById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    console.log('Review successfully found by given id ');
    return review;
  }                       

  async findByDoctorId(doctorId: string): Promise<Review[]> {
    try {
      const reviews = await this.reviewModel.find({ doctor_id: doctorId }).exec();
      console.log('Reviews found by doctor ID:');
      return reviews;
    } catch (error) {
      console.error('Error occurred while finding reviews by doctor ID:', error);
      throw error;
    }
  }
  
  async findByPatientId(patientId: string): Promise<Review[]> {
    const reviews=await this.reviewModel.find({ patient_id: patientId }).exec();
    console.log('Reviews found by patient ID:');
    return reviews;
   }

  async findByEmail(email: string): Promise<Review[]> {
    const reviews=await this.reviewModel.find({ 'story.email': email }).exec();
    console.log('Reviews found by user email:');
    return reviews;
  }

 async update(id: string, updateReviewDto: ReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!updatedReview) {
      throw new NotFoundException('Review not found');
    }
    console.log('Review updated successfully:', updatedReview);
    return updatedReview;
  }

  async delete(id: string): Promise<Review> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deletedReview) {
      throw new NotFoundException('Review not found');
    }
    console.log('Review deleted successfully:', deletedReview);
    return deletedReview;
  }
}

