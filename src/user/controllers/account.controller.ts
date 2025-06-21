import { Controller, Post } from '@nestjs/common';

@Controller('/user/account')
export class UserAccountController {
  @Post('/update-profile')
  registration() {
    return {
      message: 'User profile updated',
      error: false,
      data: null,
    };
  }
}
