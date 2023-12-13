import { Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  createUser(registerDto: RegisterDto) {}
}
