import { IsString, IsBoolean, IsNotEmpty, IsObject } from 'class-validator';

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  error: boolean;

  @IsObject()
  data: object | null;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
