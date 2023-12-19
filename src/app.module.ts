import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { MeetModule } from './meet/meet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV_PATH,
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
    MeetModule,
  ],
})
export class AppModule {}
