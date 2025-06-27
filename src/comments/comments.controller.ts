import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { createArticleDto } from 'src/articles/dto/create-article.dto';

@ApiTags("Commentaires")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({summary: "création de l'article"})
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiResponse({status: 200, type: createArticleDto})
  @ApiBody({type: createArticleDto})
  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({summary: "récupère un commentaire en particulier"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiOperation({summary: "Mise à jour du commentaire"})
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiParam({name: "id", description: "l'identifiant du commentaire"})
  @ApiBody({type: UpdateCommentDto})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @ApiOperation({summary: "Suppression du commentaire"})
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiParam({name: "id", description: "l'identifiant du commentaire"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
