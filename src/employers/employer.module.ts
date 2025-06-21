import { Module } from '@nestjs/common';
import { EmployerController } from './controllers/employers.controller';
import { EmployerService } from './services/employer.service';

@Module({
  providers: [EmployerService],
  controllers: [EmployerController],
  imports: [EmployerService],
  exports: [],
})
export class EmployerModule {}
