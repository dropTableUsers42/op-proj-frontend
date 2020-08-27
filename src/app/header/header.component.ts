import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../_services/scroll.service';
import { PageStyleService } from '../_services/page-style.service';
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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
  './header-colors.component.css'],
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
	],
})
export class HeaderComponent implements OnInit {

  logo = 'LOGO';
  wishlist = 'WISHLIST';

  @Input('page') page_style;

  scrolled: boolean;

  get header_trigger() {
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
      return this.page_style.concat('-scrolled');
    }
  }

  get logo_trigger() {
    if(!this.scrolled)
    {
      return 'default';
    }
    else
    {
      return 'transform';
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

  constructor(private router: Router, private scrollService: ScrollService, private pageStyleService: PageStyleService) { }

  ngOnInit(): void {
    this.scrollService.events$.subscribe(event => {
      this.scrolled = !event;
    });
    this.pageStyleService.events$.subscribe(ps => {
      this.scrolled = false;
    })
  }

  sidenavToggle() {
    this.onSidenavToggle.emit();
  }

  showHeader() {
    if(this.router.url.includes('login') || this.router.url.includes('register'))
    {
      return false;
    }
    return true;
  }

  profileClick() {
    this.router.navigate(['profile']);
  }

  logoClick() {
    this.router.navigate(['']);
  }

}
