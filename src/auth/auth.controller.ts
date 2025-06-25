import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './dto/auth-user.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Get('login')
    login(@Body() authUserDto: authUserDto) {
        return this.authService.login(authUserDto)
    }

    @UseGuards(AuthGuard)
    @Get('profle')
    getProfile(@Request() req) {
        return this.authService.getProfile(req)
    }
}
