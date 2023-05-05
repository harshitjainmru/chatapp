import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLoggedIn = false;
  constructor() { }
logIn(){
this.isLoggedIn = true
}
logOut(){
  this.isLoggedIn = false
}
isAuth(){
  return this.isLoggedIn;
}
}
