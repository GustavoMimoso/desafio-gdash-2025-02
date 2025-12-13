
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from './catalog.schema';

@Injectable()
export class CatalogsService {
  constructor(@InjectModel(Catalog.name) private catalogModel: Model<Catalog>) {}

  async create(name: string, description: string, userId: string) {
    const catalog = new this.catalogModel({
      name,
      description,
      createdBy: userId,
    });
    return await catalog.save();
  }

  async findAll() {
    return await this.catalogModel.find().populate('createdBy', 'email').sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return await this.catalogModel.findById(id).populate('createdBy', 'email');
  }

  async update(id: string, name: string, description: string, status: string) {
    return await this.catalogModel.findByIdAndUpdate(
      id,
      { name, description, status },
      { new: true }
    );
  }

  async delete(id: string) {
    return await this.catalogModel.findByIdAndDelete(id);
  }
}
