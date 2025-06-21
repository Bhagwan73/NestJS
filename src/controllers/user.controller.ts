import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from '../dto/user.dto';
import { UserStore } from '../store/user.store';
import { UserStore2 } from 'src/store/user2.store';
import { UserService } from 'src/services/user.service';

const USERS: UserDTO[] = [];

@Controller('/users')
export class UserController {
  constructor(
    private userStore: UserStore,
    private userStore2: UserStore2,
    private userService: UserService,
  ) {}

  @Post('/register')
  addUser(@Req() req: Request, @Body() userData: UserDTO) {
    USERS.push(userData);
    this.userStore.addUser({ name: 'SHUBHMAN', age: 22, id: 1 });
    return {
      message: 'User added',
      error: false,
      data: this.userStore,
    };
  }
}
