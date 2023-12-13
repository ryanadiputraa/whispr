import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'user/entities/user';
import { JWTTokens } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  // private readonly logger = new Logger(AuthService.name);
  constructor(private jwtService: JwtService) {}

  async login(user: User, password: string): Promise<JWTTokens> {
    try {
      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException({ message: "password didn't match" });
      }
      const accessToken = await this.jwtService.signAsync({ sub: user.id });
      return { access_token: accessToken };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException();
    }
  }
}
