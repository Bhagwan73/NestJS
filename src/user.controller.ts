import { Body, Controller, Get } from '@nestjs/common';
import { ParseDatePipe } from './parse-date.pipe';

@Controller()
export class UserController {
  @Get('/test8/custom-pipes')
  customPipe(@Body('time', ParseDatePipe) time: string): string {
    console.log(time);
    return `Hello test 8`;
  }
}
