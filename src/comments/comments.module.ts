import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ArticlesService } from 'src/articles/articles.service';
import { Comment } from './entities/comment.entity';
import { UsersModule } from 'src/users/users.module';
import { ArticlesModule } from 'src/articles/articles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    UsersModule,
    ArticlesModule,
    AuthModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
