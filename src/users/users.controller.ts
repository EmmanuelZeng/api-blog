import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
@ApiTags('Utilisateurs')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('create')
    @ApiOperation({summary: "Créer un utilisateur"})
    @ApiResponse({status: 200, description: "utilisateur créé avec succès"})
    @ApiBody({type: createUserDto})
    create(@Body() data: createUserDto) {
        return this.usersService.create(data);
    }

    @ApiOperation({summary: "Créer un utilisateur"})
    @ApiBody({type: [createUserDto]})
    @Get()
    getUser() {
        return this.usersService.getUsers();
    }
}
