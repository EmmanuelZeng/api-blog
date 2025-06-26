import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authUserDto } from './dto/auth-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Authentifications')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @ApiOperation({summary: "utilisée pour connecter un utilisateur"})
    @ApiResponse({status: 201, description: "connexion réussite", type: authUserDto})
    @Get('login')
    login(@Body() authUserDto: authUserDto) {
        return this.authService.login(authUserDto)
    }

    @ApiOperation({summary: "utilisé pour récupérer le profile d'uitlisateur"})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('profle')
    getProfile(@Request() req) {
        return this.authService.getProfile(req)
    }
}
