import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UsersService } from 'src/users/users.service';
import { ArticlesService } from 'src/articles/articles.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesService
  ){}
  async create(comment: CreateCommentDto) {
    const user = await this.usersService.findById(comment.authorId);
    const article = await this.articlesService.getOne(comment.articleId)
    const comments = await this.commentRepository.create({
      content: comment.content,
      author: user,
      article: article
    })
    if(!comments) throw new HttpException('Impossible de commenter pour cet article', HttpStatus.BAD_REQUEST)
    await this.commentRepository.save(comments)
    return 
  }

  async findAll() {
    const articles = await this.commentRepository.find({
      relations: ['author', 'article'],
      select: {
        content: true,
        createdAt: true,
        author: {
          name: true
        },
        article: {
          id: true
        }
      }
    });
    return articles;
  }

  async findOne(id: number) {
    try {
      const commentaire = await this.commentRepository.createQueryBuilder('comment')
                        .leftJoinAndSelect('comment.author', 'author')
                        .where('comment.id =:id', {id: id})
                        .select([
                          'comment.id',
                          'comment.content',
                          'comment.createdAt',
                          'author.id',
                          'author.name'
                        ])
                        .getOne()
      if(!commentaire) return new HttpException('commentaire non trouvé', HttpStatus.NOT_FOUND);
      return commentaire;
    } catch (error) {
      throw new HttpException("Une erreur est survenu lors de l'affichage du commentaire", HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.getOne(id)
    await this.commentRepository.update(id, updateCommentDto);
    return new HttpException('Commentaire modifié avec succès', HttpStatus.OK);
  }

  async remove(id: string) {
    const comment = await this.getOne(id)
    await this.commentRepository.remove(comment);
    return new HttpException('commentaire supprimé', HttpStatus.NO_CONTENT);
  }

  async getOne(id: string) {
    const comment = await this.commentRepository.findOneOrFail({
      where: { id },
      relations: ['author', 'article']
    });
    if(!comment) throw new HttpException("Commentaire non trouvé", HttpStatus.NOT_FOUND)
    
    return comment;
  }
}
