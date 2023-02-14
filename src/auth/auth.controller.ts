import { Body, Controller, ForbiddenException, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtServiceExtend } from './jwt.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtServiceExtend: JwtServiceExtend) { }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() request: Request) {
    return await this.jwtServiceExtend.delete(request.user.token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('fetch-user')
  async fetch(@Request() request: Request) {
    console.log(request.user);
    return await this.authService.fetch(request.user.user_id);
  }
}
