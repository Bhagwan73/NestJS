import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as validator from 'validator';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({
    type: String,
    trim: true,
    required: [true, 'First name is required field'],
  })
  first_name: string;

  @Prop({
    type: String,
    trim: true,
    required: [true, 'Last name is required field'],
  })
  last_name: string;

  @Prop({
    type: String,
    trim: true,
    default: '91',
    required: [true, 'Phone code is required field'],
  })
  phone_code: string;

  @Prop({
    type: String,
    trim: true,
    required: [true, 'Phone number is required field'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please provide a valid phone number'],
  })
  phone: string;

  @Prop({
    type: String,
    trim: true,
    required: [true, 'Email is required field'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    required: [true, 'Password is required field'],
  })
  password: string;

  @Prop({
    type: String,
    trim: true,
  })
  token: string;

  @Prop({ type: Boolean, default: false })
  is_login_attempt_exceeded: boolean;

  @Prop({ type: Number, default: 0 })
  login_count: number;

  @Prop({ type: Boolean, default: false })
  is_blocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
