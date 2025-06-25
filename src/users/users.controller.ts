import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Post('create')
    create(@Body() data: createUserDto) {
        return this.usersService.create(data);
    }

    @Get()
    getUser() {
        return this.usersService.getUsers();
    }
}
