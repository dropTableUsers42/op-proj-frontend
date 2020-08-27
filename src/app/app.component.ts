import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { PageStyleService } from './_services/page-style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              './app-colors.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{

  logo = 'LOGO';
  wishlist = 'WISHLIST'
  public isMenuOpen = false;
  internal_page_style;

  get sidenav_class() { 
    if(this.page_style == 'home')
    {
      return 'home';
    }
    else
    {
      return 'search';
    }
  }

  constructor(public router: Router, private pageStyleService: PageStyleService) {
  }

  ngOnInit() {
    this.pageStyleService.events$.subscribe(ps => {
      this.internal_page_style = ps;
    });
    this.internal_page_style = 'home';
  }

  ngAfterViewInit() {
    
  }
  
  ngOnDestroy() {
  }

  get page_style()
  {
    return this.internal_page_style;
  }

  get initial_page_style()
  {
    if(this.router.url.includes('search/core') || this.router.url.includes('opps'))
    {
      return 'core';
    }
    else if(this.router.url.includes('search/consult'))
    {
      return 'consult';
    }
    else if(this.router.url.includes('search/it'))
    {
      return 'it';
    }
    else if(this.router.url.includes('search/ent'))
    {
      return 'ent';
    }
    else if(this.router.url.includes('search/fin'))
    {
      return 'fin';
    }
    else if(this.router.url.includes('search/socdev'))
    {
      return 'socdev';
    }
    else
    {
      return 'home';
    }
  }
}
