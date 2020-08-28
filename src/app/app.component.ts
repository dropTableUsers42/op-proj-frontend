import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { PageStyleService } from './_services/page-style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              './app-colors.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges{

  logo = 'LOGO';
  wishlist = 'WISHLIST'
  public isMenuOpen = false;
  page_style;

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

  ngOnChanges() {}

  constructor(public router: Router, private pageStyleService: PageStyleService) {
  }

  ngOnInit() {
    this.pageStyleService.events$.subscribe(ps => {
      this.page_style = ps;
    });
  }

  ngAfterViewInit() {
  }
  
  ngOnDestroy() {
  }
}
