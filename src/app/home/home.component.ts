import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgbTooltipModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private data = inject(DataService);

  socialLinks = this.data.getSocialLinks();

  skills = this.data.getSkills();

  workExperiences = this.data.getWorkExperience();
}
