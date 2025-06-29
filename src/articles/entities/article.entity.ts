import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title:string

    @Column("text")
    content:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deleteDate: Date

    @ManyToOne(()=> User, (user) => user.articles)
    author: User

    @OneToMany(() => Comment, (comment) => comment.article, {onDelete: "CASCADE"})
    comments: Comment[]
}