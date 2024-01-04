import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { db, baqend } from 'baqend';

db.connect('ramizloki', true);

@Injectable()
export class DBReady implements Resolve<baqend> {
    resolve(route: ActivatedRouteSnapshot): Promise<baqend> {
        return db.ready();
    }
}

@Injectable()
export class DBUserIsLoggedIn implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return db.ready().then(() => {
            if (!db.User.me) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        });
    }
}

@Injectable()
export class DBUserIsAdmin implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return db.ready().then(() => {
            if (!db.User.me) { // todo: check if user is in admin role
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        });
    }
}

export const DB_PROVIDERS = [DBReady, DBUserIsLoggedIn, DBUserIsAdmin];
