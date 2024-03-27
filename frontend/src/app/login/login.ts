import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})
export class LoginPage  {

  constructor() {}
  
  public login() {
    console.log("Hello Hell");
  }
}

