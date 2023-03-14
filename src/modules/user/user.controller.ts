import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.services';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get('users')
  async getUsers():Promise<any> {
    return await this.userService.getUsers();
  }
}
