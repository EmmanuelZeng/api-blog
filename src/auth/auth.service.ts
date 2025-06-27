import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtServices: JwtService
    ){}

    //Génération d'une clé de cryptage
    async generateSalt() {
        const salt = await bcrypt.genSalt()
    }

    //Cryptage de refrech token
    async hashRefreshToken(refresh_token: string): Promise<string> {
        const hash = await bcrypt.hash(refresh_token, 9);
        return hash;
    }

    //Test de validate de mot de passe
    async validatePassword(incomePassword: string, existPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(incomePassword, existPassword);
        if(!isMatch) {
        throw new HttpException(`Le mot de passe que vous avez entré est incorrect !`, HttpStatus.NOT_ACCEPTABLE);
        }
        return isMatch;
    }

    //Création de token
    async sign(payload: Record<string, any>): Promise<string> {
        const token = this.jwtServices.sign(payload);
        return token;
    }

    //Test de validation de refresh token
    async validateRefreshToken(incomeToken: string, existToken: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(incomeToken, existToken);
        if (!isMatch) {
        throw new HttpException(`Accès réfusé !`, HttpStatus.FORBIDDEN);
        }
        return isMatch;
    }

    //Creation de token d'accès
    async signAccessToken(payload: Record<string, any>): Promise<string> {

        return  this.jwtServices.signAsync(payload,
            {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '7500m',
            },
        )
    }


    //Création de token de rafraichissement
    async signRefreshToken(payload: Record<string, any>): Promise<string> {

        return  this.jwtServices.signAsync(payload,
            {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
            },
        )
        
    }

    //Verification de token d'accès
    async verifyAccessToken(token: string){
        const result = await this.jwtServices.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET
        })
        return result
    }

    //Verification de token d'accès
    async verifyRefreshToken(token: string){
        const result = await this.jwtServices.verify(token,{
        secret: process.env.JWT_REFRESH_SECRET
        })
        return result
    }
}
