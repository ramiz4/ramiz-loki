import { Component, OnInit, HostListener } from '@angular/core';
import { db } from 'baqend';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  scrolledTop: boolean = false;
  pages: Array<any> = [];

  ngOnInit() {
    db.ready().then(() => {
      db['Page'].find()
        .equal('homepage', null)
        .equal('published', true)
        .ascending('position')
        .resultList((pages: any) => {
          this.pages = pages;
        });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolledTop = number > 100;
  }
}
