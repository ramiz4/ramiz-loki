import { Component, OnInit, HostListener } from '@angular/core';
import { db } from 'baqend';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  scrolledTop: boolean;
  pages: Array<any>;
  me: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    db.ready().then(() => {
      db.Page.find()
        .equal('homepage', null)
        .equal('published', true)
        .ascending('position')
        .resultList((pages: any) => {
          this.pages = pages;
        });
    });
    this.authService.getMe.subscribe(me => this.me = me);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolledTop = number > 100;
  }

  logout() {
    this.authService.logout();
  }

}
