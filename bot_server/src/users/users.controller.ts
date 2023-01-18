import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  //signup
  @Post('/signup')
  async addUser(
    @Res() res,
    @Body('password') userPassword: string,
    @Body('username') userName: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    if (await this.usersService.doesUserExist(userName)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'User already exists',
      });
    }
    const result = await this.usersService.insertUser(userName, hashedPassword);
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }
  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
  //Get / protected local
  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }
  //Get / protected jwt
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
