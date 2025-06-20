import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryColumn()
    id: number

    @Column()
    title:string

    @Column()
    content:string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteDate: Date

    @ManyToOne(()=> User, (user) => user.articles)
    author: Article
}