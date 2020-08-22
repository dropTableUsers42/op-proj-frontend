import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../_services/scroll.service';
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
    if(this.page_style != 'core')
    {
      return 'default';
    }
    else if(this.page_style == 'core' && !this.scrolled)
    {
      return 'search';
    }
    else
    {
      return 'core-scrolled';
    }
  }

  get logo_trigger() {
    if(this.page_style != 'core')
    {
      return 'default';
    }
    else if(this.page_style == 'core' && !this.scrolled)
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

  constructor(private router: Router, private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.scrollService.events$.subscribe(event => {
      this.scrolled = !event;
    });
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
