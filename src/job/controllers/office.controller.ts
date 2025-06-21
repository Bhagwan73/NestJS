import { Controller, Get } from '@nestjs/common';

@Controller('/office')
export class OfficeController {
  @Get('/details')
  getAllJobs() {
    return {
      message: 'Office details fetched successfully',
      error: false,
      data: null,
    };
  }
}
