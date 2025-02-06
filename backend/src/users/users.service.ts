import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}


    // ✅ Correction : retourne `undefined` au lieu de `null`
    async findByUsername(username: string): Promise<User | undefined> {
      const user = await this.userRepository.findOne({ where: { username } });
      return user || undefined;  // ✅ Retourne `undefined` si l'utilisateur est `null`
    }

  async createUser(username: string, password: string, role: 'admin' | 'client') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, password: hashedPassword, role });
    return this.userRepository.save(newUser);
  }

  // ✅ Méthode de connexion
  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      token: ''  
    };
  }
}
