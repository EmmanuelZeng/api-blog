import { Body, Controller, Get, Post } from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articleService: ArticlesService
    ){}
    @Post('create')
    createArticle(@Body() createArticleDto: createArticleDto) {
        return this.articleService.createArticle(createArticleDto)
    }

    @Get()
    getAllArticles(){
        return this.articleService.getAllArticles();
    }
}
