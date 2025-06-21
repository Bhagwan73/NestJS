import { Module } from '@nestjs/common';
import { UserModule } from './user/users.module';
import { JobModule } from './job/jobe.module';
import { RouterModule } from '@nestjs/core';

const ROUTES = [
  { module: UserModule, path: 'user' },
  {
    module: JobModule,
    path: 'jobs',
    //   children: [
    //   {
    //     path: 'dashboard',
    //     module: DashboardModule,
    //   },
    //   {
    //     path: 'metrics',
    //     module: MetricsModule,
    //   },
    // ],
  },
];

@Module({
  imports: [UserModule, JobModule, RouterModule.register(ROUTES)],
  controllers: [],
  providers: [],
})
export class AppModule {}
