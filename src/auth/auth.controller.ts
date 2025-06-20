import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Get('login')
    login(@Body() authUserDto: authUserDto) {
        return this.authService.login(authUserDto)
    }
}
