import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content:string

    @IsNotEmpty()
    authorId: string

    @IsNotEmpty()
    articleId: string
}
