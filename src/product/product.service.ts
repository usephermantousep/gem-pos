import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interface/product.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<IProduct>
  ) { }
  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    try {
      return await this.productModel.create(createProductDto);
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException(`Product ${createProductDto.name} is exist`);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<IProduct[]> {
    return await this.productModel.find({}, '-createdAt -updatedAt -__v', {
      populate: [{
        path: 'company_id',
        model: 'Company',
        select: 'name'
      },
      {
        path: 'categoryproduct_id',
        model: 'CategoryProduct',
        select: 'name'
      }]
    });
  }

  async findOne(id: string): Promise<IProduct> {
    const product = await this.productModel.findById(id, '-createdAt -updatedAt -__v', {
      populate: [{
        path: 'company_id',
        model: 'Company',
        select: 'name'
      },
      {
        path: 'categoryproduct_id',
        model: 'CategoryProduct',
        select: 'name'
      }]
    });

    if (!product) throw new NotFoundException();

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Object> {
    const product = await this.findOne(id);
    await product.updateOne(updateProductDto);
    return {
      message: "OK"
    };
  }

  async remove(id: string): Promise<Object> {
    const product = await this.findOne(id);
    await product.delete();
    return {
      message: "OK"
    };
  }
}
