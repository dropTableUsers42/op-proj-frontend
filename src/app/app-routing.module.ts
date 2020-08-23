import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OpsearchComponent } from './opsearch/opsearch.component';
import { ProfileComponent } from './profile/profile.component';
import { OppsCardComponent } from './opps-card/opps-card.component';
import { OppsWishlistComponent } from './opps-wishlist/opps-wishlist.component';
import { OppDetailComponent } from './opp-detail/opp-detail.component';
import { Profilev2Component } from './profilev2/profilev2.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit', component: RegisterComponent },
  { path: 'profilev2/:slug', component: Profilev2Component },
  { path: 'search/:domain', component: OpsearchComponent },
  { path: 'opps/:slug', component: OppDetailComponent },
  { path: '**', redirectTo: ''},
];

export const AppRoutingModule = RouterModule.forRoot(routes);
