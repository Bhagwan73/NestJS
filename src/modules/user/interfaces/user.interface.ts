import { Document } from 'mongoose';

export interface User extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone_code: string;
  readonly phone: string;
  readonly password: string;
}
