import { Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'auth/auth.guard';
import { handleServiceException } from 'utils/exception';
import { MeetService } from './meet.service';

@Controller('api/meets')
export class MeetController {
  constructor(private meetService: MeetService) {}

  @UseGuards(AuthGuard)
  @Post()
  generateMeetSessionId() {
    try {
      return {
        data: this.meetService.generateMeetSessionId(),
      };
    } catch (error) {
      handleServiceException(error, MeetController.name);
    }
  }
}
