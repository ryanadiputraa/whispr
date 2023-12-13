import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { UserService } from 'user/user.service';
import { handleServiceException } from 'utils/exception';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.userService.createUser(registerDto);
      return { data: user };
    } catch (error) {
      handleServiceException(error, AuthController.name);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.userService.getUserByEmail(loginDto.email);
      const jwtTokens = await this.authService.login(user, loginDto.password);
      return { data: jwtTokens };
    } catch (error) {
      handleServiceException(error, AuthController.name);
    }
  }
}
