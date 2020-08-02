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

  get sidenav_class() { 
    if(this.page_style == 'core')
    {
      return 'mat-core';
    }
    else
    {
      return 'mat-default';
    }
  }

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
  }

  get page_style()
  {
    if(this.router.url.includes('search/core'))
    {
      return 'core';
    }
    else if(this.router.url.includes(''))
    {
      return 'home';
    }
  }
}
