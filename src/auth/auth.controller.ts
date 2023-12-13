import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from 'user/user.service';
import { handleServiceException } from 'utils/exception';
import { RegisterDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.userService.createUser(registerDto);
      return { data: user };
    } catch (error) {
      handleServiceException(error, AuthController.name);
    }
  }
}
