import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class createUserDto {
    @ApiProperty({type: 'string', example: "John Doe", description: "Nom complet de l'utilisateur"})
    @IsString()
    name: string

    @ApiProperty({type: 'string', example: "johndoe@gmail.com", description: "L'email de l'utilisateur"})
    @IsEmail()
    email: string

    @ApiProperty({type: 'string', example: "1234567890", description: "Mot de passe de l'utilisateur"})
    @IsString()
    password: string
}