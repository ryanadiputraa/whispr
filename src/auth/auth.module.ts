import { Module } from '@nestjs/common';

import { userProviders } from 'src/user/user.provider';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UserService, ...userProviders],
})
export class AuthModule {}
