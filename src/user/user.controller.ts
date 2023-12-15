import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'auth/auth.guard';
import { handleServiceException } from 'utils/exception';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserData(@Request() req) {
    try {
      const user = await this.userService.getUserById(req.user?.sub ?? '');
      return {
        data: user,
      };
    } catch (error) {
      handleServiceException(error, UserController.name);
    }
  }
}
