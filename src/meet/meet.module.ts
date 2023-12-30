import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MeetController } from './meet.controller';
import { MeetGateway } from './meet.gateway';
import { meetProviders } from './meet.provider';
import { MeetService } from './meet.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [MeetService, MeetGateway, ...meetProviders],
  controllers: [MeetController],
})
export class MeetModule {}
