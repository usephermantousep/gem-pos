import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    contact?: string;

    @IsDate()
    @IsOptional()
    expiredAt?: Date;
}
