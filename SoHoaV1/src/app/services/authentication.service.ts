import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {users, User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    
  }

  login(username : string, passoword: string) {
    var user : User;
    for (let item of users) {
      if (item.username === username && item.password === passoword) {
        localStorage.setItem('user', item.username);
        localStorage.setItem('role', item.userole);
        if (item.roles) {
          localStorage.setItem('roles', item.roles);
        }
        return item;
      }

    }
  }

  logout() {

  }

  ngOnDestroy(): void {
    
  }

}
