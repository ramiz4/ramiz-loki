import { Routes } from '@angular/router';

import { DBReady } from './db';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { db: DBReady } },
  { path: 'about', component: AboutComponent, resolve: { db: DBReady } },
  {
    path: 'contact',
    component: ContactComponent,
    resolve: { db: DBReady } /*, canActivate: [DBUserIsLoggedIn]*/,
  },
  { path: '**', component: PageNotFoundComponent },
];
