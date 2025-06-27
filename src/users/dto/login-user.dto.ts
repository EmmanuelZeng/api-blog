import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator"

export class LoginUserDTO {
    @ApiProperty({description: "L'email de l'utilisateur", example: "example@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @ApiProperty({description: "Le mot de passe de l'utilisateur", example: "1234567890"})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    password:string
}