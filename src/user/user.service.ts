import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UniqueConstraintError } from 'sequelize';
import { v4 as uuid } from 'uuid';

import { RegisterDto } from 'src/auth/dto/register-user.dto';
import { User } from './entities/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async createUser(registerDto: RegisterDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 15);
      const { email, firstName, lastName } = registerDto;

      const data = {
        id: uuid(),
        email,
        password: hashedPassword,
        firstName,
        lastName,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.logger.log(`registering new user: ${data.id}`);

      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException('email already taken');
      }
      throw new InternalServerErrorException();
    }
  }
}
