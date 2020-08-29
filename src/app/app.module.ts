import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppUiModule } from './app-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { OpsearchComponent } from './opsearch/opsearch.component';
import { JwtInterceptor } from './_helpers/jwt.interceptors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { OppsCardComponent } from './opps-card/opps-card.component';
import { OppsWishlistComponent } from './opps-wishlist/opps-wishlist.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OppDetailComponent } from './opp-detail/opp-detail.component';
import { Profilev2Component } from './profilev2/profilev2.component';
import { UserCardComponent } from './user-card/user-card.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupComponent } from './signup/signup.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { OppsWishlistv2Component } from './opps-wishlistv2/opps-wishlistv2.component';
import { ToNthPipe } from './_pipes/to-nth.pipe';
import { FollowOverlayComponent } from './follow-overlay/follow-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    OpsearchComponent,
    ProfileComponent,
    OppsCardComponent,
    OppsWishlistComponent,
    SidenavComponent,
    OppDetailComponent,
    Profilev2Component,
    UserCardComponent,
    LoginFormComponent,
    SignupComponent,
    SignupFormComponent,
    OppsWishlistv2Component,
    ToNthPipe,
    FollowOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
