import { IsNotEmpty, IsString } from "class-validator";

export class updateArticleDTO {
    @IsNotEmpty()
    @IsString()
    title:string

    @IsNotEmpty()
    @IsString()
    content:string
}