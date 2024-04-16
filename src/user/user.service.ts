import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UniqueConstraintError } from 'sequelize';
import { v4 as uuid } from 'uuid';

import { RegisterDto } from 'auth/dto/register-user.dto';
import { User } from './entities/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async createUser(registerDto: RegisterDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 15);
      const { email, first_name, last_name } = registerDto;

      const data = {
        id: uuid(),
        email,
        password: hashedPassword,
        firstName: first_name,
        lastName: last_name,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.logger.log(`registering new user: ${data.id}`);

      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException({ message: 'email already taken' });
      }
      this.logger.error('error');
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
        attributes: ['id', 'email', 'first_name', 'last_name'],
      });
      if (!user) throw new BadRequestException({ message: "user with given id didn't exists" });
      return user;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error('error');
      throw new InternalServerErrorException();
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      if (!user) throw new BadRequestException({ message: "user with given email didn't exists" });
      return user;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error('error');
      throw new InternalServerErrorException();
    }
  }
}
