import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryProductDto {
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsString()
    company_id: string;
}
