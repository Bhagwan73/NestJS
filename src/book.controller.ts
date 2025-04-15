import {
  Controller,
  Get,
  HttpCode,
  Header,
  Req,
  Res,
  Redirect,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/books')
export class BookController {
  @Get('/get-info')
  // @HttpCode(200)
  // @Header('hello', 'nest')
  // @Redirect('/books/reading')
  getBook(@Req() req: Request, @Res() res: Response) {
    // res.header('hello', 'nest');
    res.status(200).json({
      message: 'Book details fetched successfully',
      error: false,
      data: req.body.bookName,
    });
  }

  @Get('/reading')
  redirectRoute(@Req() req: Request, @Res() res: Response) {
    // res.header('hello', 'nest');
    res.status(200).json({
      message: 'Book details fetched successfully',
      error: false,
      data: req.body.bookName,
    });
  }
}
