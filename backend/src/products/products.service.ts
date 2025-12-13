import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(name: string, description: string, price: number, catalog: string, userId: string) {
    const product = new this.productModel({
      name,
      description,
      price,
      catalog,
      createdBy: userId,
    });
    return await product.save();
  }

  async findAll(catalogFilter?: string, statusFilter?: string) {
    const filter: any = {};
    
    if (catalogFilter) filter.catalog = catalogFilter;
    if (statusFilter) filter.status = statusFilter;

    return await this.productModel
      .find(filter)
      .populate('catalog', 'name')
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return await this.productModel
      .findById(id)
      .populate('catalog', 'name')
      .populate('createdBy', 'email');
  }

  async update(id: string, name: string, description: string, price: number, status: string) {
    return await this.productModel.findByIdAndUpdate(
      id,
      { name, description, price, status },
      { new: true }
    );
  }

  async delete(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}
