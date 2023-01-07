import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class getUserDto {
    @IsNumber()
    @IsPositive()
    readonly id: number;
}

export class updateUserDto extends PartialType(createUserDto) {}