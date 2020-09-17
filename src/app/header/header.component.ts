import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from '../_services/scroll.service';
import { PageStyleService } from '../_services/page-style.service';
import { AuthService } from '../_services/auth.service';
import { InterestedService } from '../_services/interested.service';
import {
	trigger,
	state,
	style,
	animate,
  transition,
  query,
  group,
  animateChild
} from '@angular/animations';
import { dpUrls, getUrl } from '../register/dp-overlay/dp-overlay.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
  './header-colors.component.scss'],
  animations: [
		trigger('headerColor', [
			state('default', style({
				backgroundColor: '#181918'
			})),
			state('search', style({
				backgroundColor: '#F9F9F9'
      })),
      state('core-scrolled', style({
				backgroundColor: '#D4E9E2'
      })),
      state('it-scrolled', style({
				backgroundColor: '#FAECDE'
      })),
      state('consult-scrolled', style({
				backgroundColor: '#FBE9E5'
      })),
      state('ent-scrolled', style({
				backgroundColor: '#D9E1E7'
      })),
      state('fin-scrolled', style({
				backgroundColor: '#F1E4ED'
      })),
      state('socdev-scrolled', style({
				backgroundColor: '#DAEDF2'
      })),
      state('core-scrolled-opps', style({
				backgroundColor: '#05905F'
      })),
      state('it-scrolled-opps', style({
				backgroundColor: '#FF9D63'
      })),
      state('consult-scrolled-opps', style({
				backgroundColor: '#E76D50'
      })),
      state('ent-scrolled-opps', style({
				backgroundColor: '#225882'
      })),
      state('fin-scrolled-opps', style({
				backgroundColor: '#D67BBB'
      })),
      state('socdev-scrolled-opps', style({
				backgroundColor: '#2BA9CA'
      })),
      transition('default <=> *', [
				animate('0.5s ease-in-out')
			]),
      transition('* => *', [
        group([
          query('@logoTransform', animateChild()),
          animate('0.25s ease-in-out'),
          ]),
      ]),
    ]),
    trigger('logoTransform', [
			state('default', style({
				opacity: 1
			})),
			state('transform', style({
				opacity: 0
			})),
			transition('* => *', [
				animate('0.25s ease-in-out')
			]),
    ]),
    trigger('colorTransform', [
			state('default', style({
				opacity: 1
			})),
			state('white', style({
				color: '#F9F9F9'
			})),
			transition('* => *', [
				animate('0.25s ease-in-out')
			]),
    ]),
    trigger('logoColorTransform', [
			state('default', style({
				opacity: 1
			})),
			state('white', style({
				backgroundColor: '#F9F9F9'
			})),
			transition('* => *', [
				animate('0.25s ease-in-out')
			]),
		]),
	],
})
export class HeaderComponent implements OnInit {

  logo = 'LOGO';
  wishlist = 'WISHLIST';

  page_style: string;

  scrolled: boolean;

  shakeState: boolean = true;

  dpUrl = '/assets/images/placeholder.jpg';

  get header_trigger() {
    if(this.router.url.includes('opps'))
    {
      if(this.scrolled)
      {
        return 'search';
      }
      else
      {
        if(this.page_style)
          return this.page_style.concat('-scrolled-opps');
        else
          return 'search';
      }
    }
    if(this.page_style == 'home')
    {
      return 'default';
    }
    else if((this.page_style == 'core' || this.page_style == 'it' || this.page_style == 'ent'
            || this.page_style == 'consult' || this.page_style == 'fin' || this.page_style == 'socdev') && !this.scrolled)
    {
      return 'search';
    }
    else
    {
      if(this.page_style)
        return this.page_style.concat('-scrolled');
      else
        return 'search';
    }
  }

  get logo_trigger() {
    if(!this.scrolled || this.router.url.includes('opps'))
    {
      return 'default';
    }
    else
    {
      return 'transform';
    }
  }

  get color_trigger() {
    if(this.scrolled || !this.router.url.includes('opps'))
    {
      return 'default';
    }
    else
    {
      return 'white';
    }
  }

  mat_style() { 
    if(this.page_style == 'core')
    {
      return 'core';
    }
    else
    {
      return 'default';
    }
  }

  get header_class() {
    let ret = {'header-container' : true};

    ret[this.page_style] = true;
    return ret;
  }

  logo_class() {
    return {
      'logo': true,
      'mat-core': this.page_style === 'core',
      'mat-default': this.page_style !== 'core',
    };
  }

  wishlist_class() {
    return {
      'wishlist': true,
      'mat-core': this.page_style === 'core',
      'mat-default': this.page_style !== 'core',
    };
  }


  @Output() onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private actRoute: ActivatedRoute, private scrollService: ScrollService, private pageStyleService: PageStyleService, private authService: AuthService, private interestedService: InterestedService) { }

  ngOnInit(): void {
    this.scrolled = false;
    this.scrollService.events$.subscribe(event => {
      this.scrolled = !event;
    });
    this.pageStyleService.events$.subscribe(ps => {
      this.page_style = ps;
      this.scrolled = false;
    });
    this.interestedService.events$.subscribe(ic => {
      this.shakeState = !this.shakeState;
    });

    let user = this.authService.currentUserValue;

    if(user.picture)
    {
      this.dpUrl = getUrl(user.picture.style, user.picture.colour);
    }

    this.authService.currentUser.subscribe(usr => {
      this.dpUrl = getUrl(usr.picture.style, usr.picture.colour);
    });
  }

  sidenavToggle() {
    this.onSidenavToggle.emit();
  }

  showHeader() {
    /*if(this.router.url.includes('login') || this.router.url.includes('register'))
    {
      return false;
    }
    return true;*/

    if(this.authService.currentUserValue && this.authService.currentUserValue.hasCompletedRegistration)
    {
      return true;
    }
    return false;
  }

  profileClick() {
    this.router.navigate(['profile']);
  }

  logoClick() {
    this.router.navigate(['']);
  }

  wishlist_link() {
    this.router.navigate(['profile'], {fragment: 'profile_wishlist'});
  }

}
