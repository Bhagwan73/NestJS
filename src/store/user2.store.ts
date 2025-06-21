import { Injectable } from "@nestjs/common";

interface User {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class UserStore2 {
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

  updateUser(id: number, user: User) {
    this.store.set(id, user);
  }

  deleteUser(id: number) {
    this.store.delete(id);
  }
}
