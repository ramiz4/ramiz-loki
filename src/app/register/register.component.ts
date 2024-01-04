import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  user = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
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

  async register() {
    this.user.username = this.user.email;
    this.error = await this.authService.register(this.user);
  }

}
