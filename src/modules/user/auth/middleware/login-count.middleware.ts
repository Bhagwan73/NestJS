import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { User } from '../user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginCountMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.userModel.findOne(
      { email },
      'password login_count is_blocked',
      {
        lean: true,
      },
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.is_blocked) {
      throw new ForbiddenException('User is blocked!');
    }

    const isCompare = await bcrypt.compare(password, user.password);
    if (!isCompare) {
      const updateLoginCount = await this.userModel.findOneAndUpdate(
        { email },
        {
          $inc: {
            login_count: 1,
          },
          $set: {
            ...(user.login_count == 4 && {
              is_blocked: true,
              is_login_attempt_exceeded: true,
            }),
          },
        },
        { new: true },
      );
      if (!updateLoginCount) {
        throw new NotFoundException('Failed to increment login count');
      }
      throw new UnauthorizedException('Invalid credentials');
    }
    next();
  }
}
