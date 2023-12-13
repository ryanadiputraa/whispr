import { Body, Controller, Post } from '@nestjs/common';

import { RegisterDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  @Post()
  register(@Body() registerDto: RegisterDto) {
    return { registerDto };
  }
}
