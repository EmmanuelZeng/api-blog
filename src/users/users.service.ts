import { Body, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/create-user.dto';
import { authUserDto } from 'src/auth/dto/auth-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async create(data: createUserDto){
        const user = this.userRepository.create(data);
        console.log(user);
        await this.userRepository.save(user);
        return `L'utilisateur ${user.name} a été créé`;
    }

    async getUsers(){
        const users = await this.userRepository.find()
        return users;
    }
    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where : {email}})
        return user;
    }
}
