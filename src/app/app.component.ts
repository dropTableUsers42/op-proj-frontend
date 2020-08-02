import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              './app-colors.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{

  logo = 'LOGO';
  wishlist = 'WISHLIST'
  public isMenuOpen = false;

  sidenav_style() { 
    if(this.getPageStyle() == 'core')
    {
      return 'mat-core';
    }
    else if(this.getPageStyle() == 'infotech')
    {
      return 'mat-infotech';
    }
    else if(this.getPageStyle() == 'consulting')
    {
      return 'mat-consulting';
    }
    else if(this.getPageStyle() == 'entrepreneurship')
    {
      return 'mat-entrepreneurship';
    }
    else if(this.getPageStyle() == 'finance')
    {
      return 'mat-finance';
    }
    else if(this.getPageStyle() == 'socdev')
    {
      return 'mat-socdev';
    }
    else
    {
      return 'mat-default';
    }
  }

  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
  }

  getContentClass() {
    if(this.router.url.includes('login'))
    {
      return 'black';
    }
    else if(this.router.url.includes('register') || this.router.url.includes('profile'))
    {
      return 'grey';
    }
    else if(this.router.url.includes('opps'))
    {
      return 'white';
    }
    else if(this.router.url.includes('search'))
    {
      return this.getHeaderClass();
    }
    else
    {
      return 'black';
    }
  }

  getHeaderClass() {
    if(this.router.url.includes('search/core'))
    {
      return 'core';
    }
    else if(this.router.url.includes('search/information%20technology'))
    {
      return 'infotech';
    }
    else if(this.router.url.includes('search/consulting'))
    {
      return 'consulting';
    }
    else if(this.router.url.includes('search/entrepreneurship'))
    {
      return 'entrepreneurship';
    }
    else if(this.router.url.includes('search/finance'))
    {
      return 'finance';
    }
    else if(this.router.url.includes('search/socdev%20&%20policy'))
    {
      return 'socdev';
    }
    return {
      'black' : true,
    };
  }

  getPageStyle()
  {
    if(this.router.url.includes('search/core'))
    {
      return 'core';
    }
    else if(this.router.url.includes('search/information%20technology'))
    {
      return 'infotech';
    }
    else if(this.router.url.includes('search/consulting'))
    {
      return 'consulting';
    }
    else if(this.router.url.includes('search/entrepreneurship'))
    {
      return 'entrepreneurship';
    }
    else if(this.router.url.includes('search/finance'))
    {
      return 'finance';
    }
    else if(this.router.url.includes('search/socdev%20&%20policy'))
    {
      return 'socdev';
    }
    else if(this.router.url.includes(''))
    {
      return 'home';
    }
  }
}
