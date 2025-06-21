import { Module } from '@nestjs/common';
import { JobController } from './controllers/jobs.controller';
import { OfficeController } from './controllers/office.controller';
import { JobService } from './services/job.service';
import { OfficeService } from './services/office.service';
import { UserModule } from 'src/user/users.module';

@Module({
  providers: [JobService, OfficeService],
  controllers: [JobController, OfficeController],
  imports: [UserModule],
  exports: [JobService],
})
export class JobModule {}
