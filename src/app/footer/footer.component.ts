import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private data = inject(DataService);

  socialLinks = this.data.getSocialLinks();
}
