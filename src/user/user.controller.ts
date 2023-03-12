import { Controller, Get } from '@nestjs/common';
import { GetUserId } from 'src/auth/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUserId() userId: number) {
    return this.userService.getMe(userId);
  }
}
