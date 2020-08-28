import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Opps } from '../_models/opps.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewChecked {

  ops = "chjbkdsghbvksdcnbadvjkdnvkjdnvjkacklamlkacklamlkacklamlklamlkbgklamlkacklamlklamlkvlklamlkvggamlkvlklamlkvdddgdfg";

  user: User;

  wishlist: Opps[];

  private fragment: string;

  constructor(private backendService: BackendService, private router: Router, private authService: AuthService, private pageStyleService: PageStyleService, private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.backendService.getMyWishlist().subscribe(ret => {
      this.wishlist = ret;
    });
    this.pageStyleService.newEvent('home');
    this.actRoute.fragment.subscribe(frag => {this.fragment = frag});
  }

  ngAfterViewChecked(): void {
    try {
      document.querySelector('#'.concat(this.fragment)).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    } catch(e) {}
  }

  onClick()
  {
    this.router.navigateByUrl("/profile/edit");
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onEditClick() {
    this.router.navigate(['profile/edit']);
  }

}
