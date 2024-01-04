import { Component, OnInit } from '@angular/core';
import { db } from 'baqend';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  socialLinks: Array<any>;
  skills: Array<any>;
  workExperiences: Array<any>;

  constructor() { }

  ngOnInit(): void {
    db.SocialLink.find()
      .equal('published', true)
      .ascending('position')
      .resultList((socialLinks: any) => {
        this.socialLinks = socialLinks;
      });

    db.Skill.find()
      .ascending('name')
      .resultList((skills: any) => {
        this.skills = skills;
      });

    db.WorkExperience.find().resultList({ depth: 1 }, (workExperiences: any) => {
      this.workExperiences = workExperiences;
    });
  }

}
