import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DBUserIsAdmin, DBUserIsLoggedIn, DBReady } from './db';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent, resolve: { db: DBReady } },
  // { path: 'register', component: RegisterComponent, resolve: { db: DBReady } },
  // { path: 'login', component: LoginComponent, resolve: { db: DBReady } },
  { path: 'about', component: AboutComponent, resolve: { db: DBReady } },
  { path: 'contact', component: ContactComponent, resolve: { db: DBReady }/*, canActivate: [DBUserIsLoggedIn]*/ },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
