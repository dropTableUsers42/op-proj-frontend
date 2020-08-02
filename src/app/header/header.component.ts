import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
  './header-colors.component.css'],
})
export class HeaderComponent implements OnInit {

  logo = 'LOGO';
  wishlist = 'WISHLIST';

  @Input('page') page_style;

  mat_style() { 
    if(this.page_style == 'core')
    {
      return 'core';
    }
    else if(this.page_style == 'infotech')
    {
      return 'infotech';
    }
    else if(this.page_style == 'consulting')
    {
      return 'consulting';
    }
    else if(this.page_style == 'entrepreneurship')
    {
      return 'entrepreneurship';
    }
    else if(this.page_style == 'finance')
    {
      return 'finance';
    }
    else if(this.page_style == 'socdev')
    {
      return 'socdev';
    }
    else
    {
      return 'default';
    }
  }

  logo_class() {
    return {
      'logo': true,
      'mat-core' : this.page_style == 'core',
      'mat-infotech' : this.page_style == 'infotech',
      'mat-consulting' : this.page_style == 'consulting',
      'mat-entrepreneurship' : this.page_style == 'entrepreneurship',
      'mat-finance' : this.page_style == 'finance',
      'mat-socdev' : this.page_style == 'socdev',
      'mat-default': this.page_style !== 'core',
    };
  }

  wishlist_class() {
    return {
      'wishlist': true,
      'mat-core' : this.page_style == 'core',
      'mat-infotech' : this.page_style == 'infotech',
      'mat-consulting' : this.page_style == 'consulting',
      'mat-entrepreneurship' : this.page_style == 'entrepreneurship',
      'mat-finance' : this.page_style == 'finance',
      'mat-socdev' : this.page_style == 'socdev',
      'mat-default': this.page_style !== 'core',
    };
  }


  @Output() onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
