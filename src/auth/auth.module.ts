import { Module } from '@nestjs/common';

import { userProviders } from 'user/user.provider';
import { UserService } from 'user/user.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UserService, ...userProviders],
})
export class AuthModule {}
