import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/response-user.dto';


@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    try {
      this.logger.log(
        `Received registration request for email: ${createUserDto.email}`,
      );

      const user = await this.userService.createUser(createUserDto);

      // Exclude sensitive fields like password
      const userResponse = {
        _id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        phoneCode: user.phone_code,
      };

      this.logger.log(`User registered successfully with ID: ${user._id}`);

      return new UserResponseDto({
        message: 'User has been created successfully',
        error: false,
        data: userResponse,
      });
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw error;
    }
  }
}
