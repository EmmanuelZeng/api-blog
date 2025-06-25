import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Article } from './articles/entities/article.entity';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities: [
        User,
        Article,
        Comment
      ],
      synchronize: true,
    }),
    UsersModule, 
    ArticlesModule, AuthModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
