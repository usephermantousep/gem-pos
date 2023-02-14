import { PartialType } from '@nestjs/swagger';
import { CreateCategoryProductDto } from './create-category-product.dto';

export class UpdateCategoryProductDto extends PartialType(CreateCategoryProductDto) {}
