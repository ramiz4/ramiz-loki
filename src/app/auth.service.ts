import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { db, model } from 'baqend';

@Injectable()
export class AuthService {

  private me: BehaviorSubject<model.User> = new BehaviorSubject<model.User>(null);

  get getMe() {
    db.ready().then(() => {
      if (db.User.me) {
        this.me.next(db.User.me);
      }
    });
    return this.me.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  register(user: any): Promise<any> {
    const newUser = new db.User(user);
    return db.User.register(newUser, user.password).then(
      (me: model.User) => {
        this.me.next(me);
        this.router.navigate(['/about']);
      },
      (error) => {
        return error.message;
      }
    );
  }

  login(user: any): Promise<any> {
    return db.User.login(user.name, user.password, user.rememberMe).then(
      (me: model.User) => {
        this.me.next(me);
        this.router.navigate(['/about']);
      },
      (error) => {
        return error.message;
      }
    );
  }

  logout(): Promise<any> {
    return db.User.logout().then(
      () => {
        this.me.next(null);
        this.router.navigate(['/']);
      },
      (error) => {
        return error.message;
      }
    );
  }

}
