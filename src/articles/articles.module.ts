import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    UsersModule,
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController],
  exports: [ArticlesService, TypeOrmModule]
})
export class ArticlesModule {}
