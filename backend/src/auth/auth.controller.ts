import { Controller, Post, Get, Request, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() req) {
    const user = await this.authService.validateUser(req.username, req.password);
    if (user) {
      return this.authService.login(user);
    } else {
      throw new BadRequestException('Invalid username or password');
    }
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }
}
