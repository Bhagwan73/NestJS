import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { BookController } from './book.controller';

@Module({
  controllers: [UsersController, BookController],
})
export class AppModule {}
