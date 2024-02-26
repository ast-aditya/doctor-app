import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User, UserDocument } from "./schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { update_Dto } from "./dto/user.dto";
import { bcrypt } from "src/utils/bcrypt";

export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,) { }
  async getUsers(query: any): Promise<any> {
    try {
      const doc = await this.UserModel.find({}).select(
        '-password -refreshToken',
      );
      const totalCount = await this.UserModel.countDocuments();

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
      if(!user){
        return user;
      }
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
    const { name, email, password } =
      userDto;
    try {
      let user = await this.getUserbyId(userId);

      const userFields = {
        name: name ? name : user.name,
        password: password ? password : user.password,
        // role: role ? role : user.user_Type,
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
      // return await this.UserModel.findByIdAndDelete(userId);
      user.is_Deleted = true;
      await user.save();

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
  async createUser(createUserDto: any): Promise<UserDocument> {
    console.log(createUserDto)
    const { name, email, password, user_Type, hashed_rt, picture } = createUserDto;
    try {
      const existingUser = await this.getUserbyEmail(email);
      if (existingUser) {
        throw new ConflictException('User with the same email already exists');
      }
  
      const newUser = new this.UserModel({
        name,
        email,
        password,
        user_Type,
        hashed_rt,
        picture,
      });
      const user = await newUser.save();
  
      console.log(`User created successfully with Id : ${user.id}`);
  
      user.password = undefined;
      user.hashed_rt = undefined;

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
  
  // async createUser(createUserDto: any): Promise<UserDocument> {
  //   const { name, email, password, role } = createUserDto;
  //   try {
  //     const existingUser = await this.getUserbyEmail(email);
  //     if (existingUser) {
  //       throw new ConflictException('User with the same email already exists');
  //     }

  //     const newUser = new this.UserModel({
  //       name,
  //       email: email,
  //       password,
  //       role
  //     });
  //     const user = await newUser.save();

  //     console.log(`User created successfully with Id : ${user.id}`);

  //     return user;
  //   } catch (error) {
  //     if (
  //       error instanceof ConflictException ||
  //       error instanceof BadRequestException ||
  //       error instanceof NotFoundException
  //     ) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException(
  //       `Error while creating user ${error.message}`,
  //     );
  //   }
  // }
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

  async updateUserWithRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<void> {
    try {
      const hashedToken = bcrypt.hashSync(refresh_token, 10);
      console.log('hashed token', hashedToken);
      await this.UserModel
        .findByIdAndUpdate(user_id, { refreshToken: hashedToken })
        .exec();
      console.log(`Successfully updated refresh token for user ${user_id}`);
    } catch (error) {
      console.error(
        `Something went wrong while updating refresh token for user ${user_id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Error while updating user with refresh token',
      );
    }
    
  }
  
  async updateUserToken(user_id: string, hash: string) {
    try {
      const user = await this.UserModel.findById(user_id);
      user.hashed_rt = hash;
      await user.save();
      console.log(
        `Refresh token ${user.hashed_rt} updated successfully for User with Id : ${user.id}`,
      );
      return user;
    } catch (error) {
      if (
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
}