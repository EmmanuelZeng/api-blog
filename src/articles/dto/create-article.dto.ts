import { IsNotEmpty, IsString } from "class-validator";

export class createArticleDto {
    @IsString()
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    content:string

    @IsNotEmpty()
    authorId:number
}