import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, ViewContainerRef, AfterContentInit, ComponentFactoryResolver, AfterContentChecked, OnChanges } from '@angular/core';
import { Opps } from '../_models/opps.model';

@Component({
  selector: 'app-opps-wishlistv2',
  templateUrl: './opps-wishlistv2.component.html',
  styleUrls: ['./opps-wishlistv2.component.scss']
})
export class OppsWishlistv2Component implements OnInit, OnChanges {

  currentIdx: number;
  totalIdx: number;

  @Input('wishlist') public opportunity_list: Opps[] = [];

  constructor(private _resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.currentIdx = 0;
    this.totalIdx = 0;
  }

  ngOnChanges(): void {
    if(this.opportunity_list)
    {
      this.totalIdx = this.opportunity_list.length;
    }
  }

  get counter_text() {
    let x = Math.floor(this.currentIdx/4) + 1;
    let y = 1;

    if(this.opportunity_list && this.opportunity_list.length > 0)
    {
      let opps_ = document.querySelector('.opps-list');
      let cont_w = opps_.getBoundingClientRect()['width'];
      let targetElm = document.querySelector('#card0');
      let target_w = 255;
      if(targetElm)
      {
        target_w = targetElm.getBoundingClientRect()['width'];
      }

      let shift = Math.floor(cont_w/target_w);

      y = Math.floor((this.opportunity_list.length-1)/shift) + 1;
      x = Math.floor(this.currentIdx/shift) + 1;
    }
    return '1';
    return x + '/' + y;
  }

  right() {

    let opps_ = document.querySelector('.opps-list');
    let cont_w = opps_.getBoundingClientRect()['width'];
    let targetElm = document.querySelector('#card0');
    let target_w = targetElm.getBoundingClientRect()['width'];
    
    this.currentIdx += Math.floor(cont_w/target_w);
    if(this.currentIdx > this.opportunity_list.length - 1)
    {
      this.currentIdx -= Math.floor(cont_w/target_w);
    }

    targetElm = document.querySelector('#card' + this.currentIdx);
    let cont_x = opps_.getBoundingClientRect()['x'];
    let target_x = targetElm.getBoundingClientRect()['x'];

    opps_.scrollBy({left: target_x - cont_x, behavior: "smooth"});
    
  }

  left() {
    let opps_ = document.querySelector('.opps-list');
    let cont_w = opps_.getBoundingClientRect()['width'];
    let targetElm = document.querySelector('#card0');
    let target_w = targetElm.getBoundingClientRect()['width'];
    
    this.currentIdx -= Math.floor(cont_w/target_w);
    if(this.currentIdx < 0)
    {
      this.currentIdx = 0;
    }

    targetElm = document.querySelector('#card' + this.currentIdx);
    let cont_x = opps_.getBoundingClientRect()['x'];
    let target_x = targetElm.getBoundingClientRect()['x'];

    opps_.scrollBy({left: target_x - cont_x, behavior: "smooth"});
  }

}
