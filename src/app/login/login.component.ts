import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  user = {
    name: '',
    password: '',
    rememberMe: false
  };
  error;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.getMe.subscribe(me => {
      if (me) {
        this.router.navigate(['/about']);
      }
    });
  }

  async logIn() {
    this.error = await this.authService.login(this.user);
  }
}
