import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createArticleDto {
    @ApiProperty({type: 'string', example: "Comment utiliser l'api blog", description: "titre de l'article"})
    @IsString()
    @IsNotEmpty()
    title:string

    @ApiProperty({example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", description: "Contenu de l'article"})
    @IsOptional()
    @IsNotEmpty()
    content:string

    @ApiProperty({description: "identifiant de l'auteur de l'article", example: "1"})
    @IsNotEmpty()
    authorId:string
}