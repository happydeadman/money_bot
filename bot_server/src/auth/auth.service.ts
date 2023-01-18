import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new NotAcceptableException('password incorrect');
    }

    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
      };
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.userName, userId: user.userId };
    return {
      username: user.userName,
      userId: user.userId,
      access_token: this.jwtService.sign(payload),
    };
  }
}
