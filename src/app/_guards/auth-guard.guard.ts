import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.currentUserValue && this.authService.currentUserValue.hasCompletedRegistration)
    {
      return true;
    }
    else if(this.authService.currentUserValue && !this.authService.currentUserValue.hasCompletedRegistration)
    {
      if(next.url.toString() === 'register')
      {
        return true;
      }
      this.router.navigate(['register']);
      return false;
    }

    this.router.navigate(['login']);
    return false;
  }
  
}
