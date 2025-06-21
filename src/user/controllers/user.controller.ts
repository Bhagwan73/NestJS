import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserServices } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import { RegistrationDataValidationPipe } from '../pipes/user-data-validations.pipe';
import { userSchema } from '../schemas/user.schema';

@Controller()
export class UserController {
  constructor(private userService: UserServices) {}

  @Post('/registration')
  @UsePipes(new RegistrationDataValidationPipe(userSchema))
  addUser(@Body() requestBody: UserDTO) {
    const data = this.userService.addUser(requestBody);
    return data;
  }

  @Get('/get-all-users')
  getAllUsers() {
    const data = this.userService.getAllUsers();
    return data;
  }
}
