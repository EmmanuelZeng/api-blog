import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class authUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password:string
}