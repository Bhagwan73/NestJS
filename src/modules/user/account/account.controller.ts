import { Controller, Put } from '@nestjs/common';

@Controller('account')
export class AccountController {

  @Put("/update-profile")
  updateProfile() {
    
  }
}
