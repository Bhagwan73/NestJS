import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User, UserDocument } from './models/user.schema';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const schema = UserSchema;

          // Pre-save middleware to hash password
          schema.pre<UserDocument>('save', async function (next) {
            if (!this.isModified('password')) return next();
            this.password = await bcrypt.hash(this.password, 12);
            next();
          });

          // Compare password with hashed password method
          schema.methods.comparePassword = async function (
            this: UserDocument,
            password: string,
          ): Promise<boolean> {
            return bcrypt.compare(password, this.password);
          };

          // GenerateAuthToken method
          // schema.methods.generateAuthToken = function (
          //   this: UserDocument,
          // ): string {
          //   const token = jwt.sign(
          //     { _id: this._id },
          //     configService.get<string>('USER_JWT_SECRET'),
          //     {
          //       expiresIn: configService.get<string>('USER_JWT_EXPIRES_IN'),
          //     },
          //   );
          //   this.token = token;
          //   return token;
          // };

          // IncrementLoginCount method
          schema.methods.incrementLoginCount = async function (
            this: UserDocument,
          ): Promise<UserDocument> {
            this.login_count += 1;
            return this.save();
          };

          return schema;
        },
        inject: [ConfigService],

      },
    ]),
    ConfigModule,
  ],
  providers: [UserService],
  controllers: [AuthController],
})
export class UserModule {}
