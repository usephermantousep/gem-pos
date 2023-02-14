import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interface/category.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<ICategory>
  ) { }
  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<ICategory[]> {
    return await this.categoryModel.find({}, '-createdAt -updatedAt -__v', {
      populate: [{
        path: 'company_id',
        model: 'Company',
        select: 'name'
      }]
    });
  }

  async findOne(id: string): Promise<ICategory> {
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Object> {
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
