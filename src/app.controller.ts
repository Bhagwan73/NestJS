import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';

interface reqBody {
  id: number;
  message: string;
  error: string;
}

export enum JobType {
  PART_TIME = 'PART_TIME',
  FULL_TIME = 'FULL_TIME',
}

@Controller()
// @UsePipes(ParseIntPipe)  ----  controller level pipe
export class AppController {
  constructor(private readonly appService: AppService) {}

  // convert datatypes individually
  @Get('/test1/:id')
  getHello(
    @Param('id', ParseIntPipe) id: number,
    @Query('increment', ParseFloatPipe) inc: number,
  ): string {
    console.log(typeof id);
    console.log(typeof inc);
    return this.appService.getHello();
  }

  // convert datatypes on method level using usepipe
  @UsePipes(ParseIntPipe) // route level pipe
  @Get('/test2/:id')
  getHi(@Param('id') id: number, @Query('increment') inc: number): string {
    console.log(typeof id);
    console.log(typeof inc);
    return 'Hi...';
  }

  // convert string to boolean
  @Get('/test3')
  getBoolean(@Body('error', ParseBoolPipe) error: boolean): string {
    console.log(typeof error);
    return 'Hi...';
  }

  // if fileld is missing , set default value || pipe chaining
  @Get('/test4')
  setDefault(
    @Body('error', new DefaultValuePipe(false), ParseBoolPipe) error: boolean,
  ): string {
    console.log(typeof error, error);
    return 'Hello test4...';
  }

  // validate uid
  @Get('/test5/:refId')
  setDefaul(@Param('refId', ParseUUIDPipe) id: string): string {
    console.log(typeof id, id);
    return 'Hello test5...';
  }

  // validate enum values
  @Get('/test6/:refId')
  validateUID(
    @Param('refId', ParseUUIDPipe) id: string,
    @Body('jobType', new ParseEnumPipe(JobType)) jobType: JobType,
  ): string {
    return `Role is valid: ${jobType}`;
  }

  // parse data in array
  // request -- id : 1-2-3-4
  @Get('/test7/:refId')
  validateArray(
    @Param('refId', ParseUUIDPipe) id: string,
    @Query('id', new ParseArrayPipe({ items: Number, separator: '-' }))
    Ids: number[],
  ): string {
    console.log(Ids);
    return `Hello test 7`;
  }
}
