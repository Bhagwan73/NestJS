import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServices } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserServices],
})
export class UserModule {}
