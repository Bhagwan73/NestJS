import { Controller, Post } from '@nestjs/common';

@Controller('/user/auth')
export class UserAuthController {
  
  @Post('/register')
  registration() {
    return {
      message: 'User is registered successfully',
      error: false,
      data: null,
    };
  }
}
