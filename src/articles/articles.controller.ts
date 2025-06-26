import { updateArticleDTO } from './dto/update-article.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articleService: ArticlesService
    ){}
    @ApiOperation({summary: "création de l'article"})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiBody({type: createArticleDto})
    @ApiResponse({status: 200, description: "article créé avec succès"})
    @Post('create')
    createArticle(@Body() createArticleDto: createArticleDto) {
        return this.articleService.createArticle(createArticleDto)
    }

    @ApiOperation({summary: "Récupération de tous les articles de la base de données"})
    @Get()
    getAllArticles(){
        return this.articleService.getAllArticles();
    }

    @ApiOperation({summary: "récupère un article en particulier via son id"})
    @ApiParam({name: "id", description: "l'identifiant d'un article"})
    @ApiResponse({description: "L'article avec l'id"})
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.articleService.findOne(id);
    }
    
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.articleService.remove(id)
    }

    @ApiOperation({summary: "Mise à jour de l'article"})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: "article mise à jour"})
    @ApiParam({name: "id", description: "identifiant pour l'article à modifier"})
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateArticleDTO: updateArticleDTO){
        return this.articleService.update(id, updateArticleDTO)
    }
}
