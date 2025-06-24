import { updateArticleDTO } from './dto/update-article.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.articleService.findOne(id);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.articleService.remove(id)
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateArticleDTO: updateArticleDTO){
        return this.articleService.update(id, updateArticleDTO)
    }
}
