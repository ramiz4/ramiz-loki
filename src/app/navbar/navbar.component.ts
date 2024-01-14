import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  scrolledTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.scrolledTop = number > 100;
  }
}
