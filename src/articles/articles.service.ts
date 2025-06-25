import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDTO } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        private readonly userService: UsersService,
        
    ){}

    async createArticle(article: createArticleDto) {
        
        const user = await this.userService.findById(article.authorId);
        try {
            const articleEntity = this.articleRepository.create({
                title: article.title,
                content: article.content,
                author: user
            });

            await this.articleRepository.save(articleEntity);

            return new HttpException("Article créé avec succès", HttpStatus.CREATED);
        } catch (error) {
            console.error("Erreur lors de la création de l'article :", error);
            throw new HttpException("Impossible de créer l'article", HttpStatus.BAD_REQUEST);
        }
    }
    async getAllArticles(){
        const articles = await this.articleRepository.find({
            relations: ['author'],
            order: {createdAt: 'DESC'},
            select: {
                title: true,
                content: true,
                createdAt: true,
                author: {
                    name: true,
                }
            }
        });
        return articles;
    }
    async findOne(id: string) {
        try {
            // Vérifier si l'article avec l'id existe dans la base de données
            const article = await this.articleRepository.createQueryBuilder('article')
                .leftJoinAndSelect('article.author', 'author')
                .where('article.id =:id', {id: id})
                .getOne();

            if(!article) return new HttpException('Article non trouvé', HttpStatus.NOT_FOUND);
            
            return article;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article :", error);
            throw new InternalServerErrorException("Une erreur est subvenue lors de la récupération de l'article");
        }
    }

    async getOne(id: string) {
        const article = await this.articleRepository.findOneOrFail({
            where: { id },
            relations: ['author']
        });
        if(!article) throw new HttpException(`Impossible de trouver l'article`, HttpStatus.NOT_FOUND);
        return article;
    }

    async remove(id: string){
        const existingArticle = await this.getOne(id);
        await this.articleRepository.remove(existingArticle);
        return new HttpException("Article supprimé avec succès", HttpStatus.NO_CONTENT);
    }

    async update(id: string, updateArticleDTO: updateArticleDTO) {
        await this.getOne(id);
        await this.articleRepository.update(id, updateArticleDTO);
        return new HttpException("Article mise à jour avec succès", HttpStatus.OK);
    }

}
