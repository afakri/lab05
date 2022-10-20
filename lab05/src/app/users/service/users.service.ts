import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private users:User[] = []
  constructor() { }

  public getUsers():User[]{
    return this.users
  }

  public addUser(user:User){
    this.users.push(user);
  }
}
