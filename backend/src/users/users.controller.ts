import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string; role: 'admin' | 'client' }) {
    return this.usersService.createUser(body.username, body.password, body.role);
  }

  // ✅ Route pour la connexion
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.usersService.login(body.username, body.password);
  }
}
