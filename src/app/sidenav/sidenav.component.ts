import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css',
              './sidenav-colors.component.css']
})
export class SidenavComponent implements OnInit {

  public isMenuOpen = true;
  @ViewChild('sidenav') public sidenav;

  @Input('page') page_style;

  @Output() onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();

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

  sidelink_class() {
    return {
      'sidelink': true,
      'mat-core' : this.page_style == 'core',
      'mat-default': this.page_style != 'core'
    }
  }

  aboutlink_class() {
    return {
      'aboutlink': true,
      'mat-core' : this.page_style == 'core',
      'mat-default': this.page_style != 'core'
    }
  }

  LinksList = [
    {link: 'search/core', name: 'Core'},
    {link: 'search/information technology', name: 'IT'},
    {link: 'search/consulting', name: 'Consulting'},
    {link: 'search/entrepreneurship', name: 'Entrepreneurship'},
    {link: 'search/finance', name: 'Finance'},
    {link: 'search/socdev & policy', name: 'Socdev & Policy'},
  ]

  AboutLink = {link: 'about', name: 'ABOUT US'}

  constructor() { }

  ngOnInit(): void {
  }

  sidenavToggle() {
    this.onSidenavToggle.emit();
  }

}
