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
    async findOne(id: string) {
        try {
            console.log("Recherche de l'article avec l'id :", id);
            // Vérifier si l'article avec l'id existe dans la base de données
            const article = await this.articleRepository.createQueryBuilder('article')
                .leftJoinAndSelect('article.author', 'author')
                .where('article.id =:id', {id: id})
                .getOne();

            if(!article) return (`Article avec l'id ${id} non trouvé.`);
            const { title, content, createdAt, author } = article;
            
            return article;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'article :", error);
            throw new InternalServerErrorException("Une erreur est subvenue lors de la récupération de l'article");
        }
    }

    async getOne(id: string) {
        const article = this.articleRepository.findOneOrFail({
            where: { id },
            relations: ['author']
        });
        if(!article) throw new HttpException(`Impossible de trouver l'article`, HttpStatus.NOT_FOUND);
        return article;
    }

    async remove(id: string){
        const existingArticle = await this.getOne(id);
        if(!existingArticle) throw new HttpException(`Article non trouvé`, HttpStatus.BAD_REQUEST);
        await this.articleRepository.remove(existingArticle);
        return existingArticle;
    }

    async update(id: string, updateArticleDTO: updateArticleDTO) {
        await this.getOne(id);
        await this.articleRepository.update(id, updateArticleDTO);
        console.log(`L'article a été mis à jour`);
        return this.findOne(id);
    }

}
