import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { db, baqend } from 'baqend';

db.connect('ramizloki', true);

@Injectable({ providedIn: 'root' })
export class DBReady implements Resolve<baqend> {
  resolve(route: ActivatedRouteSnapshot): Promise<baqend> {
    return db.ready();
  }
}
