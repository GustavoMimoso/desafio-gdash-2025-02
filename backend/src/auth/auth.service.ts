import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(body: { email: string; password: string; name: string }) {
    const user = await this.usersService.create(body);
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { user, token };
  }

  async login(body: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new Error('Invalid credentials');
    }
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { user, token };
  }
}
