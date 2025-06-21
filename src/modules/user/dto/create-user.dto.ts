import {
  IsString,
  IsEmail,
  IsMobilePhone,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @IsString()
  @IsOptional()
  phone_code?: string = '91';

  @IsMobilePhone('en-IN', {}, { message: 'Please provide a valid phone number' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
