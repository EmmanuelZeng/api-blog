import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { createArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        private readonly userService: UsersService,
        
    ){}

    async createArticle(article: createArticleDto) {
        
        const user = await this.userService.findById(article.authorId);
        if (!user) {
            throw new Error(`Utilisateur avec l'id ${article.authorId} introuvable`);
        }

        try {
            const articleEntity = this.articleRepository.create({
                title: article.title,
                content: article.content,
                author: user
            });

            await this.articleRepository.save(articleEntity);

            return `L'article a été créé avec succès`;
        } catch (error) {
            console.error("Erreur lors de la création de l'article :", error);
            throw new InternalServerErrorException("Impossible de créer l'article");
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

}
