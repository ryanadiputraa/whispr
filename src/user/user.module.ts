import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from 'database/database.module';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [UserService, ...userProviders],
  controllers: [UserController],
})
export class UserModule {}
