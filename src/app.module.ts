import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserStore } from './store/user.store';
import { UserStore2 } from './store/user2.store';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserStore, UserStore2, UserService],
})
export class AppModule {}
