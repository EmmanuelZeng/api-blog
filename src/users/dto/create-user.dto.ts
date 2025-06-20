import { IsDate, IsEmail, IsString, Length, Min } from "class-validator";

export class createUserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string
}