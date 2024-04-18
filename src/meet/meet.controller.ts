import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'auth/auth.guard';
import { handleServiceException } from 'utils/exception';
import { CreateMeetDto } from './dto/meet.dto';
import { MeetService } from './meet.service';

@Controller('api/meets')
export class MeetController {
  constructor(private meetService: MeetService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserMeets(@Request() req) {
    try {
      return {
        data: await this.meetService.listMeetByUserId(req.user?.sub ?? ''),
      };
    } catch (error) {
      handleServiceException(error, MeetController.name);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':meetId')
  async getMeetDetails(@Request() req, @Param() params: { meetId: string }) {
    try {
      return {
        data: await this.meetService.getMeetDetails(params.meetId, req.user?.sub ?? ''),
      };
    } catch (error) {
      handleServiceException(error, MeetController.name);
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async generateMeetSessionId(@Request() req, @Body() dto: CreateMeetDto) {
    try {
      return {
        data: await this.meetService.createNewMeet(req.user?.sub ?? '', dto.name),
      };
    } catch (error) {
      handleServiceException(error, MeetController.name);
    }
  }
}
