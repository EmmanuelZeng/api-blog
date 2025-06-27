import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Request, UseGuards, Param } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('users')
@ApiTags('Utilisateurs')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('create')
    @ApiOperation({summary: "Créer un utilisateur"})
    @ApiResponse({status: 200, description: "utilisateur créé avec succès"})
    @ApiBody({type: createUserDto})
    create(@Body() data: createUserDto) {
        return this.usersService.create(data.role, data);
    }

    @ApiOperation({summary: "Créer un utilisateur"})
    @ApiBody({type: [createUserDto]})
    @Get()
    getUser() {
        return this.usersService.getUsers();
    }

    @ApiOperation({summary: "utilisée pour connecter un utilisateur"})
    @ApiResponse({status: 201, description: "connexion réussite", type: LoginUserDTO})
    @Post('login')
    login(@Body() loginUserDto: LoginUserDTO) {
        return this.usersService.login(loginUserDto)
    }

    @ApiOperation({summary: "utilisé pour récupérer le profile d'uitlisateur"})
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Get('profle')
    getProfile(@Request() req) {
        return this.usersService.getProfile(req)
    }
}
