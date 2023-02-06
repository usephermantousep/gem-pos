import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name : number;

    @IsNotEmpty()
    @IsString()
    description: string;
}
