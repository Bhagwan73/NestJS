import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';


let users: User[] = [
  {
    id: 1,
    name: 'Shubhman Gill',
    age:22
  },
  {
    id: 1,
    name: 'Virat Kohli',
    age:32
  },
];

@Injectable()
export class UserServices {
  addUser(user: User) {
    users.push(user);
    return {
      message: 'User added successfully',
      error: false,
      data: users,
    };
  }
  getAllUsers(): {} {
    return {
      message: 'User list fetched successfully',
      error: false,
      data: users,
    };
  }
}
