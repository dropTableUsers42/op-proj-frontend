import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { PageStyleService } from '../_services/page-style.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css',
              './sidenav-colors.component.css']
})
export class SidenavComponent implements OnInit {

  public isMenuOpen = true;
  @ViewChild('sidenav') public sidenav;

  page_style: string;

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

  get sidenav_class() {
    let ret = {'sidenav-container' : true};

    ret[this.page_style] = true;

    return ret;
  }

  get sidelink_class() {
    return {
      'sidelink': true,
      'mat-core' : this.page_style == 'core',
      'mat-default': this.page_style != 'core'
    }
  }

  get aboutlink_class() {
    return {
      'aboutlink': true,
      'mat-core' : this.page_style == 'core',
      'mat-default': this.page_style != 'core'
    }
  }

  LinksList = [
    {link: 'search/core', name: 'Core'},
    {link: 'search/it', name: 'IT'},
    {link: 'search/consult', name: 'Consulting'},
    {link: 'search/ent', name: 'Entrepreneurship'},
    {link: 'search/fin', name: 'Finance'},
    {link: 'search/socdev', name: 'Socdev & Policy'},
  ]

  AboutLink = {link: 'about', name: 'ABOUT US'}

  constructor(private pageStyleService: PageStyleService) { }

  ngOnInit(): void {
    this.pageStyleService.events$.subscribe(ps => {
      this.page_style = ps;
    })
  }

  sidenavToggle() {
    this.onSidenavToggle.emit();
  }

}
