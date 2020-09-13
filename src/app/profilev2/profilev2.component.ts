import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Opps } from '../_models/opps.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToNthPipe } from '../_pipes/to-nth.pipe';

@Component({
  selector: 'app-profilev2',
  templateUrl: './profilev2.component.html',
  styleUrls: ['./profilev2.component.scss']
})
export class Profilev2Component implements OnInit {

  ops = "chjbkdsghbvksdcnbadvjkdnvkjdnvjkacklamlkacklamlkacklamlklamlkbgklamlkacklamlklamlkvlklamlkvggamlkvlklamlkvdddgdfg";

  user: User;

  wishlist: Opps[];

  overlayShow: boolean = false;

  overlayType: string;

  followed = true;

  get isFollowed() {
    for(var user of this.user.followers)
    {
      if(user.username == this.authService.currentUserValue.username)
      {
        return true;
      }
    }
    return false;
  }

  get follow_string() {
    return this.followed ? 'Following' : 'Follow';
  }

  get followed_class() {
    return {
      "follow-button": true,
      "followed": this.followed,
      "unfollowed": !this.followed,
    }
  }

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

  domain_ordering = [
    'core',
    'it',
    'consult',
    'ent',
    'fin',
    'socdev'
  ]

  constructor(private backendService: BackendService, private actRoute: ActivatedRoute, private router: Router, private authService: AuthService, private pageStyleService: PageStyleService) {
    this.pageStyleService.newEvent('home');
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe(val => {
      if(val.slug == this.authService.currentUserValue.username)
      {
        this.router.navigate(['profile']);
      }
      this.backendService.getUser(val.slug).subscribe(user => {
        this.user = user;
        this.followed = this.isFollowed;
        this.domain_prefs = [];
        let temp_domains = [];
        for(let domain in this.user.domains)
        {
          if(this.user.domains[domain])
          {
            temp_domains.push(this.domain_prefs_api[domain]);
          }
        }
        for (let domain of this.domain_ordering)
        {
          if (temp_domains.includes(domain)) {
            this.domain_prefs.push(domain);
          }
        }
        this.wishlist = user['wishlist'];
        this.wishlist.map(opp => {
          opp.domain = opp['domain']['type'];
        });
      });
    });
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onFollowClick() {
    if(this.followed)
    {
      this.backendService.unfollow(this.user.username).subscribe(ret =>
        {
          this.user.followers = this.user.followers.filter(item => {
            item.username != this.authService.currentUserValue.username;
          });
        });
    }
    else
    {
      this.backendService.follow(this.user.username).subscribe(ret =>
        {
          this.user.followers.push(this.authService.currentUserValue);
        });
    }
    this.followed = this.followed ? false : true;
  }

}
