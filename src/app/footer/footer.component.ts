import { Component, OnInit } from '@angular/core';
import { db } from 'baqend';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  pages: Array<any>;
  socialLinks: Array<any>;

  constructor() { }

  ngOnInit() {
    db.ready().then(() => {
      db.Page.find()
        .equal('homepage', null)
        .equal('published', true)
        .ascending('position')
        .resultList((pages: any) => {
          this.pages = pages;
        });
      db.SocialLink.find()
        .equal('published', true)
        .ascending('position')
        .resultList((socialLinks: any) => {
          this.socialLinks = socialLinks;
        });
    });
  }

}
