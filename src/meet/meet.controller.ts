import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'auth/auth.guard';
import { handleServiceException } from 'utils/exception';
import { MeetService } from './meet.service';

@Controller('api/meets')
export class MeetController {
  constructor(private meetService: MeetService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserMeets(@Request() req) {
    try {
      return {
        data: await this.meetService.ListMeetByUserId(req.user?.sub ?? ''),
      };
    } catch (error) {
      handleServiceException(error, MeetController.name);
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async generateMeetSessionId(@Request() req) {
    try {
      return {
        data: await this.meetService.createNewMeet(req.user?.sub ?? ''),
      };
    } catch (error) {
      handleServiceException(error, MeetController.name);
    }
  }
}
