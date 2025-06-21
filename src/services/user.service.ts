import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  age: number;
}
@Injectable()
export class UserService {
  private store = new Map<number, User>();

  addUser(user: User) {
    this.store.set(user.id, user);
  }

  getUser(id: number) {
    return this.store.get(id);
  }
  getUsers() {
    return [...this.store.values()];
  }
}
