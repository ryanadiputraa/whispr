import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { userProviders } from 'user/user.provider';
import { UserService } from 'user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ...userProviders, AuthService],
})
export class AuthModule {}
