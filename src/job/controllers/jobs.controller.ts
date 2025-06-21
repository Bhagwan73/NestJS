import { Controller, Get } from '@nestjs/common';

@Controller('/jobs')
export class JobController {
  @Get('/get-jobs')
  getAllJobs() {
    return {
      message: 'Job list fetched successfully',
      error: false,
      data: null,
    };
  }
}
