import { authUserDto } from './dto/auth-user.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { error } from 'console';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async login(authBody: authUserDto) {
        const { email, password } = authBody;
        const existingUser = await this.userService.getUserByEmail(email);

        if(!existingUser) throw new UnauthorizedException({error: "Mot de passe ou nom  d'utilisateur incorrect"})
        
        const isPasswordValid = await this.isPasswordValid(password, existingUser.password);
        if(!isPasswordValid) throw new UnauthorizedException({error: "Mot de passe ou nom  d'utilisateur incorrect"})
        return this.authenticateUser({id : existingUser.id})
    }

    private async isPasswordValid(password:string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }

    private async authenticateUser({id}: {id: string}){
        const payload = { id };
        return { access_token: await this.jwtService.sign(payload) }
    }
}
