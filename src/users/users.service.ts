import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async create(user: createUserDto){
        const userHashPassword = await this.hashPassword(user.password)
        try {
            await this.userRepository.save({...user, password: userHashPassword});
            console.log(user);
            return `L'utilisateur ${user.name} a été créé`;
        } catch (error) {
            throw new Error("Impossible de créer l'utilisateur")
        }
        
    }

    private async hashPassword(password: string) {
        const hashedPassword = await hash(password, 9);
        return hashedPassword;
    }
    async getUsers(){
        const users = await this.userRepository.find()
        return users;
    }
    async getUserByEmail(email: string){
        const user = await this.userRepository.findOneBy({['email'] : email});
        if(!user) throw new HttpException(`Aucun utilisateur ne correspond à l'email ${email}`, HttpStatus.BAD_REQUEST);
        return user;
    }
    async findById(id: string) {
        const user = await this.userRepository.findOneBy({['id'] : id});
        if (!user) throw new Error(`Utilisateur avec l'id ${id} introuvable`);
        return user;
    }
}
