import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn } from "typeorm"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: string

    @Column('text')
    content: string

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date

    @CreateDateColumn()
    delete: Date

    @ManyToOne(() => User, (user) => user.comments)
    author: User

    @ManyToOne(() => Article, (article) => article.comments)
    article: Article

}
