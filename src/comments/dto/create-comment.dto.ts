import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({description: "Contenue de l'article", example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"})
    @IsNotEmpty()
    @IsString()
    content:string

    @ApiProperty({description: "L'id du user qui a commenté", example: "id 3 avec comme name John Doe"})
    @IsNotEmpty()
    authorId: string

    @ApiProperty({description: "L'id de l'article", example: "id 1"})
    @IsNotEmpty()
    articleId: string
}
