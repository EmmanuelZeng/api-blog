import { Exclude } from "class-transformer";
import { Article } from "src/articles/entities/article.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    creatAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteDate: Date

    @OneToMany(() => Article, (article) => article.author)
    articles: Article[]

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[]
}