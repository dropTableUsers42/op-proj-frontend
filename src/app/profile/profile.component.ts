import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Opps } from '../_models/opps.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToNthPipe } from '../_pipes/to-nth.pipe'; 


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, AfterViewChecked {

  ops = "chjbkdsghbvksdcnbadvjkdnvkjdnvjkacklamlkacklamlkacklamlklamlkbgklamlkacklamlklamlkvlklamlkvggamlkvlklamlkvdddgdfg";

  user: User;

  wishlist: Opps[] = [];

  overlayShow: boolean = false;

  overlayType: string;

  domain_prefs_api = {
    'Core': 'core',
    'IT': 'it',
    'Consulting': 'consult',
    'Entrepreneurship': 'ent',
    'Finance': 'fin',
    'SocDev-and-Policy': 'socdev',
  }

  domain_prefs_list = {
    'core': 'Core',
    'it': 'IT',
    'consult': 'Consulting',
    'ent': 'Entrepreneurship',
    'fin': 'Finance',
    'socdev': 'Socdev & Policy'
  };

  domain_prefs = [
    'core',
    'it',
    'consult',
    'ent',
    'fin',
    'socdev'
  ]

  private fragment: string;

  constructor(private backendService: BackendService, private router: Router, private authService: AuthService, private pageStyleService: PageStyleService, private actRoute: ActivatedRoute) {
    this.pageStyleService.newEvent('home');
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.backendService.getMe().subscribe(user => {
      this.user = user;
      this.wishlist = user['wishlist'];
      this.wishlist.map(opp => {
        opp.domain = opp['domain']['type'];
      });
      this.domain_prefs = [];
      for(let domain in this.user.domains)
      {
        if(this.user.domains[domain])
        {
          this.domain_prefs.push(this.domain_prefs_api[domain]);
        }
      }
    })
    this.actRoute.fragment.subscribe(frag => {this.fragment = frag});
  }

  ngAfterViewInit() {
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
