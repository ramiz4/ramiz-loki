import { Component, OnInit } from '@angular/core';
import { db } from 'baqend';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  page: any;

  constructor() { }

  ngOnInit() {
    db['PageDetail'].load('33580710-91c8-4032-9201-34ee387b4dbe').then((page: any) => {
      this.page = page;
    });
  }
}
