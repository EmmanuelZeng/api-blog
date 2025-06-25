import { authUserDto } from './dto/auth-user.dto';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    //Fonction login user
    async login(authBody: authUserDto) {
        const { email, password } = authBody;
        const existingUser = await this.userService.getUserByEmail(email);

        if(!existingUser) throw new UnauthorizedException({error: "Mot de passe ou nom  d'utilisateur incorrect"})
        
        const isPasswordValid = await this.isPasswordValid(password, existingUser.password);
        if(!isPasswordValid) throw new UnauthorizedException({error: "Mot de passe ou nom  d'utilisateur incorrect"})
        return this.authenticateUser({id : existingUser.id})
    }

    //fonction récupérer le profile de l'utilisateur
    async getProfile(name: string) {
        const user = await this.userService.findById(name);
        if(!user) throw new HttpException('Utilisateur non trouvé', HttpStatus.FORBIDDEN);

        return {username: user.name, userEmail : user.email}
    }

    //Fonction qui vérifie le password inséré par le user et celle dans la base de données
    private async isPasswordValid(password:string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }

    //Fonction qui gère le JWT 
    private async authenticateUser({id}: {id: string}){
        const payload = { id };
        return { access_token: await this.jwtService.sign(payload) }
    }
}
