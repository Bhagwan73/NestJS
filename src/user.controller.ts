import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface Post {
  id: number;
}

// DTO data transfer object
interface PostDTO {
  name: string;
  category: string;
  roolNumber: number;
}
@Controller('/users')
export class UsersController {
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return {
      message: 'User profile fetched successfully',
      error: false,
      data: req.body.userName,
    };
  }

  // Access req query param and header
  @Get('/post/:id')
  getPosts(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') params: Post,
    @Query() query: Record<string, any>,
    @Headers() headers: string,
    @Body() body: PostDTO,
  ) {
    console.log(params, query, req.query, headers, body);
    res.status(200).json({
      message: 'Post fetched successfully',
      error: false,
      data: params,
    });
  }
}
