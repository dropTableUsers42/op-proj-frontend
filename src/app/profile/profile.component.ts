import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BackendService } from '../_services/backend.service';
import { AuthService } from '../_services/auth.service';
import { PageStyleService } from '../_services/page-style.service';
import { User } from '../_models/user.model';
import { Opps } from '../_models/opps.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToNthPipe } from '../_pipes/to-nth.pipe';
import { getUrl } from '../register/dp-overlay/dp-overlay.component';



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
    'socdev': 'SocDev & Policy'
  };

  domain_prefs = [

  ]

  domain_ordering = [
    'core',
    'it',
    'consult',
    'ent',
    'fin',
    'socdev'
  ]

  clipboardMessage = 'Copy123';

  clipboardCopied = false;

  private fragment: string;

  dpUrl = '/assets/images/placeholder.jpg';

  constructor(private backendService: BackendService, private router: Router, private authService: AuthService, private pageStyleService: PageStyleService, private actRoute: ActivatedRoute) {
    this.pageStyleService.newEvent('home');
  }

  showCopyMessage(): void {
    this.clipboardCopied = true;
    setTimeout(() => {
      this.clipboardCopied = false;
    }, 3000);
  }

  removePursued(pursued: Opps): void {
    let idx = this.user.pursued.findIndex(opps => opps.slug === pursued.slug);
    if (idx > -1)
    {
      this.user.pursued.splice(idx, 1);
    }
    this.backendService.removePursued(pursued.slug).subscribe(
      opps => {
        this.backendService.getMe();
        let usr = this.authService.currentUserValue;

        usr.pursued = opps;

        this.authService.updateUser(usr);
      }
    )
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

    this.clipboardMessage = 'Hey! There’s this platform that I’ve started using, called The Opportunity Project, which is giving out exclusive access to a small cohort. I have a referral code with me which will help you get access to the site, and I am giving it to you because I believe it will help you immensely. I hope you like it!\n\nReferral Code: ' + this.user.referralShare + '\nWebsite: www.opproject.club';

    this.dpUrl = getUrl(this.user.picture.style, this.user.picture.colour);

    this.backendService.getMe().subscribe(user => {
      this.user = user;
      this.dpUrl = getUrl(this.user.picture.style, this.user.picture.colour);
      this.wishlist = user['wishlist'];
      this.wishlist.map(opp => {
        opp.domain = opp['domain']['type'];
      });
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
