import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class authUserDto {
    @ApiProperty({description: "L'email de l'utilisateur", example: "example@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({description: "Le mot de passe de l'utilisateur", example: "1234567890"})
    @IsNotEmpty()
    @IsString()
    password:string
}