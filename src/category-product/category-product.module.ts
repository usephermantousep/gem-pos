import { Module } from '@nestjs/common';
import { CategoryProductService } from './category.service';
import { CategoryProductController } from './category.controller';
import { CategoryProductSchema } from './entities/category-product.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports :[MongooseModule.forFeature([{ name: 'CategoryProduct', schema: CategoryProductSchema }])],
  controllers: [CategoryProductController],
  providers: [CategoryProductService]
})
export class CategoryProductModule {}
