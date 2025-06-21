import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.userModel.findOne(
      { email },
      '-createdAt -updatedAt -password -token',
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
    
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const token = this.jwtService.sign({
      email: user.email,
    });
    const updateUser = await this.userModel.findOneAndUpdate(
      { email: user.email },
      {
        login_count: 0,
        token,
      },
    );

    if (!updateUser) {
      throw new NotFoundException('Failed to update user token');
    }

    return {
      token,
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { first_name, last_name, phone_code, phone, email, password } =
      registerDto;

    const existingUser = await this.userModel.findOne(
      {
        $or: [{ email }, { phone_code, phone }],
      },
      '',
      { lean: true },
    );

    if (existingUser) {
      throw new BadRequestException('Email or phone already exists');
    }

    const token = this.jwtService.sign({
      email: email,
    });
    const newUser = new this.userModel({
      first_name,
      last_name,
      phone_code,
      phone,
      email,
      password,
      token,
    });
    return newUser.save();
  }
}
