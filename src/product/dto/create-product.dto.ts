import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    categoryproduct_id: string;

    @IsNotEmpty()
    @IsString()
    company_id: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    stock?: number;

    @IsOptional()
    image?: string;
}
