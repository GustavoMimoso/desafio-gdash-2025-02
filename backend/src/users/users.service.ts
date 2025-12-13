import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return this.userModel.find().select('-password').lean();
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password').lean();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(email: string, password: string) {
    const user = new this.userModel({ email, password });
    return user.save();
  }
}
