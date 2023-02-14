import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryProductDto } from './dto/create-category-product.dto';
import { UpdateCategoryProductDto } from './dto/update-category.dto';
import { ICategoryProduct } from './interface/category.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryProductService {
  constructor(
    @InjectModel('CategoryProduct') private categoryModel: Model<ICategoryProduct>
  ) { }
  async create(createCategoryDto: CreateCategoryProductDto): Promise<ICategoryProduct> {
    try {
      return await this.categoryModel.create(createCategoryDto);
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException('Product Category is exist');
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<ICategoryProduct[]> {
    return await this.categoryModel.find({}, '-createdAt -updatedAt -__v', {
      populate: [{
        path: 'company_id',
        model: 'Company',
        select: 'name'
      }]
    });
  }

  async findOne(id: string): Promise<ICategoryProduct> {
    const category = await this.categoryModel.findById(id, '-createdAt -updatedAt -__v', {
      populate: [{
        path: 'company_id',
        model: 'Company',
        select: 'name'
      }]
    });
    if (!category) throw new NotFoundException();
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryProductDto): Promise<Object> {
    const category = await this.findOne(id);
    await category.updateOne(updateCategoryDto);
    return {};
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await category.delete();
    return {};
  }
}
