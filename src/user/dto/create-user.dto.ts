import { IsArray, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    company_id: string;

    @IsNotEmpty()
    @IsArray()
    role_id: string[];
}
