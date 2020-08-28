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
import { SignupComponent } from './signup/signup.component';
import { AuthGuardGuard } from './_guards/auth-guard.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard]},
  { path: 'profile/edit', component: RegisterComponent, canActivate: [AuthGuardGuard] },
  { path: 'profilev2/:slug', component: Profilev2Component, canActivate: [AuthGuardGuard] },
  { path: 'search/:domain', component: OpsearchComponent, canActivate: [AuthGuardGuard] },
  { path: 'opps/:slug', component: OppDetailComponent, canActivate: [AuthGuardGuard] },
  { path: '**', redirectTo: ''},
];

export const AppRoutingModule = RouterModule.forRoot(routes);
