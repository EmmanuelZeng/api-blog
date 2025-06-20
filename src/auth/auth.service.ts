import { authUserDto } from './dto/auth-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ){}

    async login(authBody: authUserDto) {
        const { email, password } = authBody;
        const existingUser = await this.userService.getUserByEmail(email)
    }
}
