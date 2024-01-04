import { Component, OnInit } from '@angular/core';
import { db } from 'baqend';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  page: any;

  constructor() { }

  ngOnInit() {
    db.PageDetail.load('ddae24db-92f7-45be-bd7e-fa3a337a26f3').then((page: any) => {
      this.page = page;
    });
  }

}
