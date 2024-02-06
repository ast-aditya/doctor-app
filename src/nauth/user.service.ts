import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AuthUserRegister, UserDocument } from "./schema/auth_register.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { update_Dto } from "./dto/auth.dto";
import { ConfigService } from "@nestjs/config";

export class UserService {
  constructor(@InjectModel(AuthUserRegister.name) private UserModel: Model<AuthUserRegister>,
  private configService : ConfigService) { }
  async getUsers(query: any): Promise<any> {
    try {
      const doc = await this.UserModel.find({}).select(
        '-password -refreshToken',
      );
      const totalCount = await this.UserModel.countDocuments();
        console.log(this.configService.get('PORT'))
      // Convert Mongoose document to a plain JavaScript object
      const docObject = doc.map(doc => doc.toObject());

      return { results: docObject.length, total: totalCount, data: docObject };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching users',
      );
    }
  }

  async getUserbyEmail(email: string): Promise<UserDocument> {
    try {
      const user = await this.UserModel.findOne({ email: email });
      // this.logger.log(`User successfully fetched with Id : ${user.id}`)
      return user;
    } catch (error) {
      console.error(
        `Error while finding user with email ${email}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Something went wrong while finding the user',
      );
    }
  }
  async getUserbyId(userId: string): Promise<UserDocument> {
    try {
      const user = await this.UserModel.findById(userId);
      if (!user)
        throw new NotFoundException(`User with id ${userId} not found`);
      console.log(`User successfully fetched with Id : ${user.id}`);
      return user;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error while creating user ${error.message}`,
      );
    }
  }

  async updateUser(
    userDto: update_Dto,
    userId: string,
  ): Promise<UserDocument> {
    const { name, role, email, password } =
      userDto;
    try {
      let user = await this.getUserbyId(userId);

      const userFields = {
        name: name ? name : user.name,
        password: password ? password : user.password,
        role: role ? role : user.role,
        email: email ? email : user.email,
      };

      user = await this.UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: userFields },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );

      console.log(`User with id ${userId} updated`);

      return user;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error while creating user ${error.message}`,
      );
    }
  }
  async deleteUser(userId: string) {
    try {
      const user = await this.getUserbyId(userId);
      console.log(user)
      return await this.UserModel.findByIdAndDelete(userId);
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error while creating user ${error.message}`,
      );
    }
  }
  async createUser(createUserDto: any): Promise<UserDocument> {
    const { name, email, password, role } = createUserDto;
    try {
      const existingUser = await this.getUserbyEmail(email);
      if (existingUser) {
        throw new ConflictException('User with the same email already exists');
      }

      const newUser = new this.UserModel({
        name,
        email: email,
        password,
        role
      });
      const user = await newUser.save();

      console.log(`User created successfully with Id : ${user.id}`);

      return user;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error while creating user ${error.message}`,
      );
    }
  }
  async removeRefreshToken(userId: string) {
    try {
      const user = await this.UserModel.findOne().where({ _id: userId });

      if (user.hashed_rt != null) user.hashed_rt = null;
      console.log(`User logged out with ${userId}`);
      return await user.save();
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error while removing refresh token ${error.message}`,
      );
    }
  }

}