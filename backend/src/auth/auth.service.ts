import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(email: string, password: string) {
    // Verifica se usuário já existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Usuário já existe');
    }

    // Cria novo usuário
    const user = await this.usersService.create(email, password);
    
    // Gera token JWT
    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
    });

    return {
      message: 'Usuário registrado com sucesso',
      user: {
        id: user._id,
        email: user.email,
      },
      access_token: token,
    };
  }

  async login(email: string, password: string) {
    // Busca usuário
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Verifica senha (em produção, usar bcrypt)
    if (user.password !== password) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Gera token JWT
    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
    });

    return {
      message: 'Login realizado com sucesso',
      user: {
        id: user._id,
        email: user.email,
      },
      access_token: token,
    };
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }
}
