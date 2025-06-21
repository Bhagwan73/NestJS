import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    // await user.generateAuthToken();
    const savedUser = await user.save();
    return savedUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const result = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .lean();
    if (!result) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return result;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.userModel.find().lean();
    if (!result) {
      throw new NotFoundException('Users data not found!');
    }
    return result;
  }

  async getUser(userId: string): Promise<User> {
    const result = await this.userModel.findById(userId);
    if (!result) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return result;
  }
  async deleteUser(userId: string): Promise<User> {
    const result = await this.userModel.findByIdAndDelete(userId);
    if (!result) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return result;
  }
}
