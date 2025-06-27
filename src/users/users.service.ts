import { hashPassword } from './../utils/hashPassword';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService: AuthService
    ){}

    async create(role: string, createUserDto: createUserDto){
        const userHashPassword = await hashPassword(createUserDto.password)
        if(role != 'SUPER_ADMIN')
            throw new HttpException(`Désolé! Vous n'avez pas l'autorisation d'ajouter un utilisateur comme admin`, HttpStatus.FORBIDDEN)
        const userExist = await this.getUserByEmail(createUserDto.email)
        if(userExist)
            throw new HttpException("Cet email existe déjà dans la base de données", HttpStatus.CONFLICT)
        //const salt = await this.authService.generateSalt();
        createUserDto.password = await hashPassword(createUserDto.password);
        let isSuperAdmin = false;
        if(createUserDto.role === 'SUPER_ADMIN'){
            const userExists = await this.userRepository.createQueryBuilder('user')
                            .where('user.role =:role', {role: 'SUPER_ADMIN'})
                            .getOne();
            if(userExists)
                throw new HttpException(`Impossible de créer un super admin!`, HttpStatus.CONFLICT)
            else isSuperAdmin = true;
        }   
        if(isSuperAdmin) createUserDto.role = 'ADMIN';
        const user = await this.userRepository.save(createUserDto);             
        if(!user)
            throw new HttpException(`L'enregistrement de cet utilisateur n'a pas réussi`, HttpStatus.CONFLICT)
        return user;
    }
    async getUsers(){
        const users = await this.userRepository.find()
        return users;
    }
    async getUserByEmail(email: string){
        return await this.userRepository.findOne({ where: { email } });
    }
    async findById(id: string) {
        const user = await this.userRepository.findOneBy({['id'] : id});
        if (!user) throw new Error(`Utilisateur avec l'id ${id} introuvable`);
        return user;
    }

    async findForValidate(payload: any){
        const user = await this.userRepository.createQueryBuilder('user')
                    .where('user.id =:id', {id: payload.userId})
                    .andWhere('user.username =:username', {username: payload.username})
                    .andWhere('user.deletedAt IS NULL')
                    .getOne();
        if(!user)
        throw new HttpException("Cet utilisateur n'existe pas encore !",HttpStatus.UNAUTHORIZED)
        return user;
    }
    //Fonction login user
    async login(loginUserDto: LoginUserDTO){
        const userByEmail = await this.getUserByEmail(loginUserDto.email);
        console.log(userByEmail)
        if(!userByEmail)
            throw new HttpException("Aucun compte ne correspond à cet email",HttpStatus.NOT_FOUND)
        if (!userByEmail.password)
            throw new HttpException("Mot de passe introuvable pour cet utilisateur", HttpStatus.INTERNAL_SERVER_ERROR);
        const isMatch= await this.authService.validatePassword(loginUserDto.password, userByEmail.password)
        if(!isMatch)
            throw new HttpException("le mot de passe est incorrect!",HttpStatus.AMBIGUOUS)
        const data = {
            userId: userByEmail.id,
            username: userByEmail.name,
            email: userByEmail.email,
            role: userByEmail.role
        }
        const token = await this.authService.signAccessToken(data);
        const refreshToken = await this.authService.signRefreshToken(data);
        await this.setCurrentRefreshToken(refreshToken, userByEmail.id);
        delete userByEmail.password;
        delete userByEmail.refreshToken;
        return {...userByEmail, token:token};
    }
  
    async setCurrentRefreshToken(refreshToken: string, userId: string){
        const user = await this.getOne(userId);
        if(user){
            const currentHashedRefreshToken = await this.authService.hashRefreshToken(refreshToken)
            return await this.userRepository.update(userId,{refreshToken: currentHashedRefreshToken})
        }else{
            throw new HttpException(`Cet utilisateur n'existe pas encore !`, HttpStatus.NOT_FOUND);
        }
    }
    async getOne(id: string){
        const user = await this.userRepository.createQueryBuilder('user')
                    .where('user.id =:id', {id: id})
                    .getOne();
        if(!user)
        throw new HttpException(`Cet utilisateur n'existe pas encore !`, HttpStatus.NOT_FOUND);
        return user;
    }
    //fonction récupérer le profile de l'utilisateur
    async getProfile(name: string) {
        const user = await this.findById(name);
        if(!user) throw new HttpException('Utilisateur non trouvé', HttpStatus.FORBIDDEN);
            return {username: user.name, userEmail : user.email}
        }
}
