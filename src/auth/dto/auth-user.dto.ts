import { IsEmail, IsString } from 'class-validator';
export class authUserDto {
    @IsEmail()
    email: string

    @IsString()
    password:string
}