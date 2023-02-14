import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryProductService } from './category.service';
import { CreateCategoryProductDto } from './dto/create-category-product.dto';
import { UpdateCategoryProductDto } from './dto/update-category.dto';

@Controller('category-product')
export class CategoryProductController {
  constructor(private readonly categoryProductService: CategoryProductService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryProductDto) {
    return await this.categoryProductService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryProductService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryProductDto) {
    return this.categoryProductService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryProductService.remove(id);
  }
}
